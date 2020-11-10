
// Global Variables
let condition1 = false;
let condition2 = false;
let condition4 = false;

let x2Sector;
let x3Sector;

let lastSector;
let currentSector;

let oneHitsArr;

let freeSpinsFlag = false;
const freeSpinsSector = 6;

let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];

// wheel sectors - [startDeg, endDeg, prize, sectorHits]
const sectors = [
    [ 0, 19, 18, 0 ],
    [ 20, 39, 17, 0 ],
    [ 40, 59, 16, 0 ],
    [ 60, 79, 15, 0 ],
    [ 80, 99, 14, 0 ],
    [ 100, 119, 13, 0 ],
    [ 120, 139, 12, 0 ],
    [ 140, 159, 11, 0 ],
    [ 160, 179, 10, 0 ],
    [ 180, 199, 9, 0 ],
    [ 200, 219, 8, 0 ],
    [ 220, 239, 7, 0 ],
    [ 240, 259, 6, 0 ], // BONUS
    [ 260, 279, 5, 0 ],
    [ 280, 299, 4, 0 ],
    [ 300, 319, 3, 0 ],
    [ 320, 339, 2, 0 ],
    [ 340, 359, 1, 0 ]
];

const _sectors = [
    { startDeg: 0, endDeg: 19, prize: 18, sectorHits: 0 },
    { startDeg: 20, endDeg: 39, prize: 17, sectorHits: 0 },
    { startDeg: 40, endDeg: 59, prize: 16, sectorHits: 0 },
    { startDeg: 60, endDeg: 79, prize: 15, sectorHits: 0 },
    { startDeg: 80, endDeg: 99, prize: 14, sectorHits: 0 },
    { startDeg: 100, endDeg: 119, prize: 13, sectorHits: 0 },
    { startDeg: 120, endDeg: 139, prize: 12, sectorHits: 0 },
    { startDeg: 140, endDeg: 159, prize: 11, sectorHits: 0 },
    { startDeg: 160, endDeg: 179, prize: 10, sectorHits: 0 },
    { startDeg: 180, endDeg: 199, prize: 9, sectorHits: 0 },
    { startDeg: 200, endDeg: 219, prize: 8, sectorHits: 0 },
    { startDeg: 220, endDeg: 239, prize: 7, sectorHits: 0 },
    { startDeg: 240, endDeg: 259, prize: 6, sectorHits: 0 },
    { startDeg: 260, endDeg: 279, prize: 5, sectorHits: 0 },
    { startDeg: 280, endDeg: 299, prize: 4, sectorHits: 0 },
    { startDeg: 300, endDeg: 319, prize: 3, sectorHits: 0 },
    { startDeg: 320, endDeg: 339, prize: 2, sectorHits: 0 },
    { startDeg: 340, endDeg: 359, prize: 1, sectorHits: 0 },
]

let tenTurns = [];
// need all sectors with the respective degrees

// HELPER FUNCTIONS AND CONDITIONS
function resetTenTurnsArr() { // resets the counters after the 10th spin
    tenTurns = [];
    turns = tenTurns.length;
}

function fillUpTenTurnsArr( currPos ) {
    tenTurns.push( currPos );
}

function rotateWheel( deg ) {
    let currStatus = document.getElementsByClassName( "status" )[ 0 ];
    currStatus.textContent = "Spinning...";

    fillUpTenTurnsArr( deg );

    let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

    wheel.style.transitionTimingFunction = "ease-out";
    wheel.style.transitionDuration = " 6s";
    wheel.style.transform = "rotate(" + deg + "deg)";

    deg = parseInt( deg ) % 360;

    btn.disabled = true;

    setTimeout( () => {
        resetWheel( deg )
    }, 6000 );
}

function resetWheel( deg ) {
    let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

    wheel.style.transitionTimingFunction = "";
    wheel.style.transitionDuration = "0s";
    wheel.style.transform = "rotate(" + deg + "deg)";

    let currStatus = document.getElementsByClassName( "status" )[ 0 ];

    for ( const x of sectors ) {
        if ( parseInt( deg ) >= x[ 0 ] && parseInt( deg ) <= x[ 1 ] ) {
            if ( x[ 2 ] === 6 ) {
                currStatus.textContent = "Congratulations! You've won 3 free spins, Enjoy!";

                deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );
                freeSpinsFlag = true;
                // let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];
                btn.disabled = true;
                freeSpins( deg );

            } else {
                currStatus.textContent = "Congratulations! You've won " + "$" + x[ 2 ];
                btn.disabled = false;
            }
        }
    }
}


function rotateFreeSpins( deg ) {  // rotates the wheel in bonus spins
    let sect = getCurrentSector( deg );

    if ( sect === freeSpinsSector ) {
        deg = modifyAsPerLastSector( deg );
        sect = getCurrentSector( deg );
    }

    let currStatus = document.getElementsByClassName( "status" )[ 0 ];
    currStatus.textContent = "Spinning...";

    let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

    wheel.style.transitionTimingFunction = "ease-out";
    wheel.style.transitionDuration = "6s";
    wheel.style.transform = "rotate(" + deg + "deg)";

    deg = parseInt( deg ) % 360;

    setTimeout( () => {
        resetWheel( deg )
    }, 6000 );
}

function resetFreeSpins( deg ) {
    let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

    wheel.style.transitionTimingFunction = "";
    wheel.style.transitionDuration = "0s";
    wheel.style.transform = "rotate(" + deg + "deg)";

    let currStatus = document.getElementsByClassName( "status" )[ 0 ];

    for ( const x of sectors ) {
        if ( parseInt( deg ) >= x[ 0 ] && parseInt( deg ) <= x[ 1 ] ) {
            currStatus.textContent = "Congratulations! You've won " + x[ 2 ];
        }
    }
}

function freeSpins( deg ) {

    let total = 0;

    setTimeout( () => {
        console.log( 'first deg received - ', deg );
        deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );
        console.log( deg );

        total += getCurrentSector( deg );

        rotateFreeSpins( deg );
    }, 3000 )

    setTimeout( () => {
        console.log( 'first deg received - ', deg );
        deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );
        console.log( deg );

        total += getCurrentSector( deg );

        rotateFreeSpins( deg );
    }, 10000, deg )

    setTimeout( () => {
        console.log( 'first deg received - ', deg );
        deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );

        total += getCurrentSector( deg );

        rotateFreeSpins( deg )
    }, 17000, deg )

    setTimeout( () => {
        let currStatus = document.getElementsByClassName( "status" )[ 0 ];
        currStatus.textContent = "Wow! You've won " + "$" + total + " from your free spins!";

        let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];
        btn.disabled = false;
    }, 24000 );
}

function getCurrentSector( deg ) { // getCurrentSector

    let normalizeDeg = deg - 1440;
    normalizeDeg = parseInt( normalizeDeg / 10 );

    for ( const sector of sectors ) {
        let startDeg = sector[ 0 ]
        let endDeg = sector[ 1 ];

        startDeg = parseInt( startDeg / 10 );
        endDeg = parseInt( endDeg / 10 );

        if ( startDeg === normalizeDeg || endDeg === normalizeDeg ) {
            return sector[ 2 ];
        }
    }
}

function modifyAsPerLastSector( deg ) { // move to next sector 
    if ( deg + 20 >= 1800 ) {
        return deg -= 20
    }
    if ( deg - 20 <= 1440 ) {
        return deg += 20
    }
    return deg += 20;
}


// function hitSector( sector ) { // updates the hits for a sector
//     let finder = sectors.find( x => x[ 2 ] === sector )
//     return finder[ 3 ]++;
// }

function hitSector( sector ) { // updates the hits for a sector
    let finder = _sectors.find( x => x["prize"] === sector );
    return finder["sectorHits"]++;
}


// Conditions
function isLockSectors2xAnd3x( sector ) { // -------------- Condition 1 --------------------
    // Checks our current sector if it is hit 2x times and there is a sector that is already on 2 hits as well

    let currentSector = sectors.find( x => x[ 2 ] === sector );
    let differentSectorsArr = sectors.filter( x => x[ 3 ] === 2 );

    if ( currentSector[ 3 ] === 2 && differentSectorsArr[ 1 ] && currentSector[ 2 ] !== differentSectorsArr[ 1 ][ 2 ] ) {
        return true
    }
    return false;
}

function isLockSector3x( sector ) { // -------------- Condition 2 --------------------
    let currentSector = sectors.find( x => x[ 2 ] === sector );
    let differentSectorsArr = sectors.filter( x => x[ 3 ] === 2 );

    if ( currentSector[ 3 ] === 2 && differentSectorsArr[ 1 ] && currentSector[ 2 ] !== differentSectorsArr[ 1 ][ 2 ] ) {
        return true;
    }
    return false;
}

function check1Hit( sector ) { // -------------- Condition 3 --------------------
    let finder = sectors.find( x => x[ 2 ] === sector );
    let twoXTwo = sectors.filter( x => x[ 3 ] === 2 );

    if ( finder[ 3 ] === 1 && twoXTwo.length === 2 ) {
        return true;
    }

    return false;
}

function getOnlyOneHitsSectors() { // -------------- Condition 4 -------------------- Used in condition 5th as well
    if ( !x2Sector && !x3Sector ) {
        return sectors.filter( x => x[ 3 ] === 1 );
    }
}


function checkHitOnlyZeroes() { // -------------- Condition 6 --------------------
    if ( x2Sector && x3Sector ) {
        return true;
    }
    return false;
}



// MAIN FUNC - 10 turns game flow 
function turnBasedLoop() {

    const min = 1440;
    const max = 1800;

    let deg = Math.floor( Math.random() * ( max - min ) + min );

    if ( tenTurns.length === 0 ) { // First spin - here

        lastSector = getCurrentSector( deg );

        // changes the sector if free spins
        if ( lastSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
            lastSector = currentSector;
        }

        rotateWheel( deg );
        hitSector( lastSector );

        console.log(_sectors)
        console.log( lastSector );

    } else if ( tenTurns.length === 1 ) { // Second spin - here

        currentSector = getCurrentSector( deg );

        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        console.log( 'last - ', lastSector );
        console.log( 'current - ', currentSector );

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector;

    } else if ( tenTurns.length === 2 ) {  // Third spin - here

        currentSector = getCurrentSector( deg );

        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        console.log( 'last - ', lastSector );
        console.log( 'current - ', currentSector );

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector

    } else if ( tenTurns.length === 3 ) { // Fourth spin - here

        currentSector = getCurrentSector( deg );

        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        console.log( 'last - ', lastSector );
        console.log( 'current - ', currentSector );

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector

    } else if ( tenTurns.length === 4 ) { // Fifth spin - here

        currentSector = getCurrentSector( deg );

        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( isLockSectors2xAnd3x( currentSector ) ) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector
            return;

        } else if ( isLockSector3x( currentSector ) ) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector
            return;
        }


        console.log( 'last - ', lastSector );
        console.log( 'current - ', currentSector );

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector;

    } else if ( tenTurns.length === 5 ) { // Sixth spin - here we can have sectors with 2x and 3x completed

        freeSpinsFlag = true;           // Free spins only available from 2nd spin to the 5th

        if ( condition1 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector
            return;
        }


        if ( condition2 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector
            return;
        }


        currentSector = getCurrentSector( deg );


        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }


        if ( isLockSectors2xAnd3x( currentSector ) ) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;

        } else if ( isLockSector3x( currentSector ) ) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }


        if ( check1Hit( currentSector ) ) { // 3rd condition

            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector
            return;
        }

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector;

    } else if ( tenTurns.length === 6 ) {  // Seventh spin 

        currentSector = getCurrentSector( deg );

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }


        if ( condition1 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector
            return;
        }

        if ( condition2 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( isLockSectors2xAnd3x( currentSector ) ) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;

        } else if ( isLockSector3x( currentSector ) ) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }


        let checkForTwoHits = sectors.filter( x => x[ 3 ] === 2 ); // 4th condition

        if ( checkForTwoHits.length === 0 ) {

            oneHitsArr = getOnlyOneHitsSectors();

            currentSector = oneHitsArr[ 0 ][ 2 ];
            deg = oneHitsArr[ 0 ][ 0 ] + 1440 + 5;

            condition4 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;

        }

        if ( checkForTwoHits.length === 1 ) { // 5th condition  
            oneHitsArr = getOnlyOneHitsSectors();

            currentSector = oneHitsArr[ 0 ][ 2 ];
            deg = oneHitsArr[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }


        if ( check1Hit( currentSector ) ) { // 3rd condition

            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }


        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector;

    } else if ( tenTurns.length === 7 ) { // Eighth spin 

        if ( condition1 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( condition2 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( condition4 ) {
            oneHitsArr = getOnlyOneHitsSectors();

            currentSector = oneHitsArr[ 0 ][ 2 ];
            deg = oneHitsArr[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        currentSector = getCurrentSector( deg );

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }


        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }


        if ( isLockSectors2xAnd3x( currentSector ) ) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;

        } else if ( isLockSector3x( currentSector ) ) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( check1Hit( currentSector ) ) { // 3rd condition

            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( checkHitOnlyZeroes() ) { // 6th condition - IF WE HAVE LOCKED 2X AND 3X, WE MUST HIT ONLY 0 HITS SECTORS
            let sectors0Hits = sectors.filter( x => x[ 3 ] === 0 );

            for ( const x of sectors0Hits ) {
                if ( x[ 3 ].includes( currentSector ) ) {
                    deg = modifyAsPerLastSector( deg );
                    currentSector = getCurrentSector( deg );
                }
                return;
            }
        }

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector;

    } else if ( tenTurns.length === 8 ) { // Ninth spin 

        if ( condition1 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;


            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( condition2 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;


            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( condition4 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        currentSector = getCurrentSector( deg );

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( lastSector === currentSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }


        if ( isLockSectors2xAnd3x( currentSector ) ) { // 1st condition 
            x3Sector = currentSector;
            x2Sector = lastSector;

            condition1 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;

        } else if ( isLockSector3x( currentSector ) ) { // 2nd condition 
            x3Sector = currentSector;

            condition2 = true;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }

        if ( check1Hit( currentSector ) ) { // 3rd condition

            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            return;
        }


        if ( checkHitOnlyZeroes() ) { // 6th condition 
            let sectors0Hits = sectors.filter( x => x[ 3 ] === 0 );

            for ( const x of sectors0Hits ) {
                if ( x[ 3 ].includes( currentSector ) ) {
                    deg = modifyAsPerLastSector( deg );
                    currentSector = getCurrentSector( deg );
                }
                return;
            }
        }

        hitSector( currentSector );
        rotateWheel( deg );

        lastSector = currentSector;

    } else if ( tenTurns.length === 9 ) { // Tenth spin 

        if ( freeSpinsFlag && currentSector === freeSpinsSector ) {
            deg = modifyAsPerLastSector( deg );
            currentSector = getCurrentSector( deg );
        }

        if ( condition1 ) {
            let zeroHitters = sectors.filter( x => x[ 3 ] === 0 );

            currentSector = zeroHitters[ 0 ][ 2 ];
            deg = zeroHitters[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;

            resetTenTurnsArr();
            return;
        }

        if ( condition2 ) {
            oneHitsArr = getOnlyOneHitsSectors();

            currentSector = oneHitsArr[ 0 ][ 2 ];
            deg = oneHitsArr[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;

            resetTenTurnsArr();
            return;
        }

        if ( condition4 ) {
            let twoHitters = sectors.filter( x => x[ 3 ] === 2 );

            currentSector = twoHitters[ 0 ][ 2 ];
            deg = twoHitters[ 0 ][ 0 ] + 1440 + 5;


            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;

            resetTenTurnsArr();
            return;
        }

        // This is when we have completed only 2x with 2 hits and 3x with 2 hits
        let checkForTwoHits = sectors.filter( x => x[ 3 ] === 2 );
        if ( checkForTwoHits.length === 2 ) {

            currentSector = checkForTwoHits[ 0 ][ 2 ];
            deg = checkForTwoHits[ 0 ][ 0 ] + 1440 + 5;

            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            resetTenTurnsArr();
            return;
        }

        if ( x3Sector ) {
            oneHitsArr = getOnlyOneHitsSectors();

            currentSector = oneHitsArr[ 0 ][ 2 ];
            deg = oneHitsArr[ 0 ][ 0 ] + 1440 + 5;


            hitSector( currentSector );
            rotateWheel( deg );

            lastSector = currentSector;
            resetTenTurnsArr();
            return;
        }

        resetTenTurnsArr();
    }
}


