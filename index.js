
// Global Variables
let condition1 = false;
let condition2 = false;
let condition3 = false;
let condition4 = false;
let condition5 = false;
let condition6 = false;
let condition7 = false;
let condition8 = false;

let x2Sector;
let x3Sector;

let tenTurns = [];
let sectorsWith2x = [];

let lastSector;
let currentSector;

let oneHitsArr;
let zeroHitters;
let twoHitsArray;


let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];

const _sectors = [
    { startDeg: 0, endDeg: 19, price: 18, sectorHits: 0 },
    { startDeg: 20, endDeg: 39, price: 17, sectorHits: 0 },
    { startDeg: 40, endDeg: 59, price: 16, sectorHits: 0 },
    { startDeg: 60, endDeg: 79, price: 15, sectorHits: 0 },
    { startDeg: 80, endDeg: 99, price: 14, sectorHits: 0 },
    { startDeg: 100, endDeg: 119, price: 13, sectorHits: 0 },
    { startDeg: 120, endDeg: 139, price: 12, sectorHits: 0 },
    { startDeg: 140, endDeg: 159, price: 11, sectorHits: 0 },
    { startDeg: 160, endDeg: 179, price: 10, sectorHits: 0 },
    { startDeg: 180, endDeg: 199, price: 9, sectorHits: 0 },
    { startDeg: 200, endDeg: 219, price: 8, sectorHits: 0 },
    { startDeg: 220, endDeg: 239, price: 7, sectorHits: 0 },
    { startDeg: 240, endDeg: 259, price: 6, sectorHits: 0 },
    { startDeg: 260, endDeg: 279, price: 5, sectorHits: 0 },
    { startDeg: 280, endDeg: 299, price: 4, sectorHits: 0 },
    { startDeg: 300, endDeg: 319, price: 3, sectorHits: 0 },
    { startDeg: 320, endDeg: 339, price: 2, sectorHits: 0 },
    { startDeg: 340, endDeg: 359, price: 1, sectorHits: 0 },
]


// HELPER FUNCTIONS AND CONDITIONS
function resetTenTurnsArr() { // resets the counters after the 10th spin
    return tenTurns = [];
}

// function fillUpTenTurnsArr( currPos ) {
//     tenTurns.push( currPos );
// }

function rotateWheel( deg ) {
    let currStatus = document.getElementsByClassName( "status" )[ 0 ];
    currStatus.textContent = "Spinning...";

    // fillUpTenTurnsArr( deg );

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

    for ( const x of _sectors ) {
        if ( parseInt( deg ) >= x[ "startDeg" ] && parseInt( deg ) <= x[ "endDeg" ] ) {
            // if ( x[ 2 ] === 6 ) {
            //     currStatus.textContent = "Congratulations! You've won 3 free spins, Enjoy!";

            //     deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );
            //     freeSpinsFlag = true;
            //     // let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];
            //     btn.disabled = true;
            //     freeSpins( deg );

            // } else {
            currStatus.textContent = "Congratulations! You've won " + "$" + x[ "price" ];
            btn.disabled = false;
            // }
        }
    }
}


// function rotateFreeSpins( deg ) {  // rotates the wheel in bonus spins
//     let sect = getCurrentSector( deg );

//     if ( sect === freeSpinsSector ) {
//         deg = modifyAsPerLastSector( deg );
//         sect = getCurrentSector( deg );
//     }

//     let currStatus = document.getElementsByClassName( "status" )[ 0 ];
//     currStatus.textContent = "Spinning...";

//     let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

//     wheel.style.transitionTimingFunction = "ease-out";
//     wheel.style.transitionDuration = "6s";
//     wheel.style.transform = "rotate(" + deg + "deg)";

//     deg = parseInt( deg ) % 360;

//     setTimeout( () => {
//         resetWheel( deg )
//     }, 6000 );
// }

// function resetFreeSpins( deg ) {
//     let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

//     wheel.style.transitionTimingFunction = "";
//     wheel.style.transitionDuration = "0s";
//     wheel.style.transform = "rotate(" + deg + "deg)";

//     let currStatus = document.getElementsByClassName( "status" )[ 0 ];

//     for ( const x of sectors ) {
//         if ( parseInt( deg ) >= x[ 0 ] && parseInt( deg ) <= x[ 1 ] ) {
//             currStatus.textContent = "Congratulations! You've won " + x[ 2 ];
//         }
//     }
// }

// function freeSpins( deg ) {

//     let total = 0;

//     setTimeout( () => {
//         console.log( 'first deg received - ', deg );
//         deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );
//         console.log( deg );

//         total += getCurrentSector( deg );

//         rotateFreeSpins( deg );
//     }, 3000 )

//     setTimeout( () => {
//         console.log( 'first deg received - ', deg );
//         deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );
//         console.log( deg );

//         total += getCurrentSector( deg );

//         rotateFreeSpins( deg );
//     }, 10000, deg )

//     setTimeout( () => {
//         console.log( 'first deg received - ', deg );
//         deg = Math.floor( Math.random() * ( 1800 - 1560 ) + 1560 );

//         total += getCurrentSector( deg );

//         rotateFreeSpins( deg )
//     }, 17000, deg )

//     setTimeout( () => {
//         let currStatus = document.getElementsByClassName( "status" )[ 0 ];
//         currStatus.textContent = "Wow! You've won " + "$" + total + " from your free spins!";

//         let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];
//         btn.disabled = false;
//     }, 24000 );
// }

function getCurrentSector( deg ) { // getCurrentSector

    let normalizeDeg = deg - 1440;
    normalizeDeg = parseInt( normalizeDeg / 10 );

    for ( const sector of _sectors ) {
        let startDeg = sector[ "startDeg" ]
        let endDeg = sector[ "endDeg" ];

        startDeg = parseInt( startDeg / 10 );
        endDeg = parseInt( endDeg / 10 );

        if ( startDeg === normalizeDeg || endDeg === normalizeDeg ) {
            return sector;
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


function hitSector( sector ) { // updates the hits for a sector
    let finder = _sectors.find( x => x[ "price" ] === sector[ "price" ] );
    return finder[ "sectorHits" ]++;
}



function getRandomArbitrary( firstIndex, lastIndex ) {
    firstIndex = Math.ceil( firstIndex );
    lastIndex = Math.floor( lastIndex );
    return Math.floor( Math.random() * ( lastIndex - firstIndex ) + firstIndex );
}


// New functions for replacement of the "if else" conditions
function checkPrevSectors( lastSector, currentSector, currDeg ) {
    if ( lastSector === currentSector ) {

        deg = modifyAsPerLastSector( deg );

        return {
            deg
        }
    }

    deg = currDeg;

    return {
        deg
    }
}


let hitters = []

// MAIN FUNC - 10 turns game flow 
function turnBasedLoop( oneHitsArr, zeroHitters ) {

    if ( tenTurns.length >= 10 ) {
        resetTenTurnsArr();
        // resetSectorsWith2x();
        hitters = [];

        condition1 = false;
        condition2 = false;
        condition3 = false;
        condition4 = false;
        condition5 = false;
        condition6 = false;
        condition7 = false;
        condition8 = false;
    }

    const min = 1440;
    const max = 1800;

    let deg = Math.floor( Math.random() * ( max - min ) + min );
    currentSector = getCurrentSector( deg );



    if ( lastSector ) { // first check for the previous sector
        deg = checkPrevSectors( lastSector, currentSector, deg )[ "deg" ];
        // currentSector = checkPrevSectors( lastSector, currentSector, deg )[ "currentSector" ];
        currentSector = getCurrentSector( deg );
    }

    // let sectorsWith2x = _sectors.filter( x => x[ "sectorHits" ] === 2 ).map( x => x[ "price" ] );   // condition 1 --- fifth spin x2 + x3
    // let sectorsWith2x = tenTurns.filter( x => x[ "price" ] === currentSector[ "price" ] );

    let sectorsWith2x = hitters.filter( x => x[ "sectorHits" ] === 2 );

    let isCurrSectorIncluded = sectorsWith2x.filter( x => x[ "price" ] === currentSector[ "price" ] );

    if ( sectorsWith2x.length === 2 && isCurrSectorIncluded.lenght >= 1 ) {
        x3Sector = currentSector;
        x2Sector = sectorsWith2x.filter( x => x !== currentSector ).join();

        condition1 = true;
    }

    // if ( sectorsWith2x.length === 2 && sectorsWith2x.includes( currentSector ) ) {
    //     x3Sector = currentSector;
    //     x2Sector = sectorsWith2x.filter( x => x !== currentSector ).join();

    //     condition1 = true;
    // }

    // sectorsWith3x = _sectors.filter( x => x[ "sectorHits" ] === 2 ).map(x => x["price"]);   // condition 2 --- fifth spin x3
    if ( sectorsWith2x.length === 1 && isCurrSectorIncluded.lenght >= 1 ) {
        x3Sector = currentSector;

        condition2 = true;
    }

    let currSecObj = _sectors.find( x => x[ "price" ] === currentSector[ "price" ] );
    if ( sectorsWith2x.length === 2 && currSecObj[ "sectorHits" ] === 1 ) {       // Condition 3                                  // Condition 3 
        condition3 = true; // should be changed to check the "currentSector" hits if they are 1
    }

    if ( sectorsWith2x.length === 0 && tenTurns.length >= 7 ) {                                      // 4th condition
        condition4 = true; // should be changed to tenTurns array instead of _sectors.lenght
    }

    if ( sectorsWith2x.length === 1 && tenTurns.length >= 7 ) {                                      // 5th condition   
        condition5 = true; // should be changed to tenTurns array instead of _sectors.lenght
    }


    if ( x2Sector && x3Sector ) {                                                                      // Condition 6 
        condition6 = true;
    }


    if ( sectorsWith2x.length === 2 && tenTurns.length === 9 ) {                                      // Condition 7
        condition7 = true; // should be changed to tenTurns array instead of _sectors.lenght
    }


    if ( x3Sector && tenTurns.length === 9 ) {                                                       // Condition 8
        condition8 = true;
    }

    if ( condition1 || condition2 || condition3 || condition6 ) {
        zeroHitters = _sectors.filter( x => x[ "sectorHits" ] === 0 );

        let firstIndex = 0;
        let lastIndex = zeroHitters.length;

        currentSectorIndex = getRandomArbitrary( firstIndex, lastIndex );
        currentSector = zeroHitters[ currentSectorIndex ];

        deg = currentSector[ "startDeg" ] + 1440 + 5;
    }

    if ( condition4 || condition5 || condition8 ) {
        oneHitsArr = _sectors.filter( x => x[ "sectorHits" ] === 1 );

        let firstIndex = 0;
        let lastIndex = oneHitsArr.length;

        currentSectorIndex = getRandomArbitrary( firstIndex, lastIndex );
        currentSector = oneHitsArr[ currentSectorIndex ];

        deg = currentSector[ "startDeg" ] + 1440 + 5;
    }


    if ( condition7 ) {
        // twoHitsArray = _sectors.filter( x => x[ "sectorHits" ] === 2 );

        // let lastIndex = twoHitsArray.length;

        // currentSectorIndex = getRandomArbitrary( firstIndex, lastIndex ); // with the added + 1, we can pick from the 2 sectors
        // Math.random does not include the top number
        let index = sectorsWith2x.indexOf( lastSector[ "price" ] )
        currentSector = sectorsWith2x.filter( x => x[ index ] !== index )[ 0 ];

        deg = currentSector[ "startDeg" ] + 1440 + 5;
    }


    rotateWheel( deg );
    hitSector( currentSector );

    lastSector = currentSector;

    tenTurns.push( lastSector );

    let c = tenTurns.map( x => JSON.stringify( x ) );
    let b = new Set( c );
    let a = Array.from( b )
    let d = a.map( x => JSON.parse( x ) );

    hitters = d;

}


