let tenTurns = [];
let sectorsWith2x = [];
let hitters = [];
let lastSector;

let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];

let conditionsMap = {
    condition1: false,
    condition2: false,
    condition3: false,
    condition4: false,
    condition5: false,
    condition6: false,
    condition7: false,
    condition8: false,
}

// New board 
const sectorsCount = 18;

function generateSectors( secCount ) {
    let board = {};

    for ( let i = 0; i < secCount; i++ ) {
        board[ `id-${i}` ] = {
            prize: `${secCount - i}`,
            hits: 0,
            startDeg: +`${20 * i}`,
            endDeg: +`${i * 20 + 19}`
        }
    }
    return board;
}

let sectors = generateSectors( sectorsCount );


// New rotate func with sectors
function rotateWheel( currentSector, sectors ) { // sectors id-0, id-1
    let currStatus = document.getElementsByClassName( "status" )[ 0 ];
    currStatus.textContent = "Spinning...";

    let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

    let deg = sectors[ `id-${currentSector}` ][ "startDeg" ] + ( 4 * 360 ) + 5;

    wheel.style.transitionTimingFunction = "ease-out";
    wheel.style.transitionDuration = " 6s";
    wheel.style.transform = "rotate(" + deg + "deg)"; // sectors[`id-${currentSector}`]["startDeg"] + 5

    deg = parseInt( deg ) % 360; // converts to the correct degrees from 0 - 360

    btn.disabled = true;

    setTimeout( () => {
        resetWheel( currentSector, sectors, deg )
    }, 6000 );
}

// New reset function
function resetWheel( sector, sectors, deg ) { // sectors 
    let wheel = document.getElementsByClassName( "wheel-wrapper" )[ 0 ];

    wheel.style.transitionTimingFunction = "";
    wheel.style.transitionDuration = "0s";
    wheel.style.transform = "rotate(" + deg + "deg)";

    let currStatus = document.getElementsByClassName( "status" )[ 0 ];
    let arr = Object.entries( sectors )

    for ( let i = 0; i < arr.length; i++ ) {
        let id = arr[ i ][ 0 ];

        if ( id === `id-${sector}` ) {
            currStatus.textContent = "Congratulations! You've won " + "$" + arr[ i ][ 1 ][ "prize" ];
            btn.disabled = false;
            return;
        }
    }
}

// New functions for modification of sectors
function modifyAsPerLastSector( sec ) { // move to next sector 
    if ( sec + 1 > 18 ) {
        return sec -= 1
    }
    return sec += 1;
}


function hitSector( sector, sectors ) {
    let arr = Object.entries( sectors )

    for ( let i = 0; i < arr.length; i++ ) {
        let id = arr[ i ][ 0 ];
        if ( id === `id-${sector}` ) {
            arr[ i ][ 1 ][ "hits" ]++;
        }
    }
}

// New getRandomNum() func for generating sectors
function getRandomNum( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( ( max + 1 ) - min ) + min );
}

// New function for checking the previous sector
function checkPrevSectors( lastSector, currentSector ) {
    if ( lastSector === currentSector ) {
        return currentSector = modifyAsPerLastSector( currentSector );
    }
    return currentSector
}

// New reset for _hitters
function resetHitters() {
    return hitters = [];
}

// New reset for _tenTurns
function resetTenTurnsArr() {
    return tenTurns = [];
}


// New sector reset - we can re-render the new board
function isCurrSectorAlready2x( arr, currSec ) {
    return arr.find( x => x[ "price" ] === currSec[ "price" ] );
}


// New conditions - must replace the ternary operator with one if statement, since we reset all conditions at the end of the spins
const cond1 = ( sectorsWith2x, func ) => {                                // Condition 1
    if ( sectorsWith2x.length === 2 && func( sectorsWith2x, currSec ) ) {
        conditionsMap[ "condition1" ] = true,
            x3Sector = currentSector,
            x2Sector = lastSector
    }
}

const cond2 = ( sectorsWith2x, func ) => {                                // Condition 2
    if ( sectorsWith2x.length === 1 && func( sectorsWith2x, currSec ) ) {
        conditionsMap[ "condition2" ] = true,
            x3Sector = currentSector
    }
}

const cond3 = ( sectorsWith2x, currentSector ) => {                                // Condition 3 
    if ( sectorsWith2x.length === 2 && currentSector[ "hits" ] === 1 ) {
        conditionsMap[ "condition3" ] = true
    }
}

const cond4 = ( sectorsWith2x, tenTurns ) => {                                // Condition 4
    if ( sectorsWith2x.length === 0 && tenTurns.length >= 7 ) {
        conditionsMap[ "condition4" ] = true
    }
}

const cond5 = ( sectorsWith2x, tenTurns ) => {                                // Condition 5
    if ( sectorsWith2x.length === 1 && tenTurns.length >= 7 ) {
        conditionsMap[ "condition5" ] = true
    }
}

const cond6 = ( x2Sector, x3Sector ) => {                                // Condition 6
    if ( x2Sector && x3Sector ) {
        conditionsMap[ "condition6" ] = true
    }
}

const cond7 = ( sectorsWith2x, tenTurns ) => {                                // Condition 7
    if ( sectorsWith2x.length === 2 && tenTurns.length === 9 ) {
        conditionsMap[ "condition7" ] = true
    }
}

const cond8 = ( x3Sector, tenTurns ) => {                                // Condition 8
    if ( x3Sector && tenTurns.length === 9 ) {
        conditionsMap[ "condition8" ] = true
    }
}


// MAIN FUNC - 10 turns game flow 
function turnBasedLoop() {


    // New variables for the min spin deg and max spin deg
    const min = 0; // 0 - 20 range
    const max = 18; // 340 - 359 range

    let x2Sector;
    let x3Sector;

    // New check for tenTurns
    if ( tenTurns.length >= 10 ) {
        resetTenTurnsArr();
        resetHitters();
        // _resetBoard();
        sectors = generateSectors( sectorsCount );
    }

    let currentSector = getRandomNum( min, max );


    // New check for sectors only - change it to a function
    if ( lastSector ) {
        currentSector = checkPrevSectors( lastSector, currentSector );
    }

    // New sectorsWith2x
    let sectorsWith2x = hitters.filter( x => x[ "hits" ] === 2 );

    // New cond invocations 
    cond1( sectorsWith2x, isCurrSectorAlready2x( sectorsWith2x, currentSector ) );
    cond2( sectorsWith2x, isCurrSectorAlready2x( sectorsWith2x, currentSector ) );
    cond3( sectorsWith2x, currentSector );
    cond4( sectorsWith2x, tenTurns );
    cond5( sectorsWith2x, tenTurns );
    cond6( x2Sector, x3Sector );
    cond7( sectorsWith2x, tenTurns );
    cond8( x3Sector, tenTurns );

    if ( conditionsMap[ "condition1" ] || conditionsMap[ "condition2" ] || conditionsMap[ "condition3" ] || conditionsMap[ "condition6" ] ) {
        const zeroHitters = sectors.filter( x => x[ "hits" ] === 0 );

        const firstIndex = 0;
        const lastIndex = zeroHitters.length;

        currentSectorIndex = getRandomNum( firstIndex, lastIndex );
        currentSector = zeroHitters[ currentSectorIndex ];
    }

    if ( conditionsMap[ "condition4" ] || conditionsMap[ "condition5" ] || conditionsMap[ "condition8" ] ) {
        const oneHitsArr = sectors.filter( x => x[ "hits" ] === 1 );

        const firstIndex = 0;
        const lastIndex = oneHitsArr.length;

        currentSectorIndex = getRandomNum( firstIndex, lastIndex );
        currentSector = oneHitsArr[ currentSectorIndex ];
    }


    if ( conditionsMap[ "condition7" ] ) {
        currentSector = sectorsWith2x[ 0 ];

        if ( currentSector === lastSector ) {
            currentSector = sectorsWith2x[ 1 ];
        }
    }

    rotateWheel( currentSector, sectors );
    hitSector( currentSector, sectors );

    console.log( currentSector );
    console.log( lastSector );

    lastSector = currentSector;

    tenTurns.push( Object.entries( sectors )[ lastSector ] );

    hitters = Array.from( new Set( tenTurns.map( x => JSON.stringify( x ) ) ) ).map( x => JSON.parse( x ) );

    if ( hitters[] )

        console.log( tenTurns )

    for ( const x in conditionsMap ) {
        conditionsMap[ x ] = false;
    }
}


