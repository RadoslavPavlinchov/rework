const sectorsCount = 18;
const sectorWidth = 360 / sectorsCount;
const splitInHalf = sectorsCount / 2;

let currStatus = document.getElementsByClassName( "status" )[ 0 ];
let app = document.getElementById( "wheel-wrapper" );

function generateSectors( secCount ) {
    let board = {};

    for ( let i = 0; i < secCount; i++ ) {
        board[ `id-${i}` ] = {
            prize: `${i + 1}`,
            hits: 0,
            startDeg: +`${sectorWidth * i}`,
            endDeg: +`${i * sectorWidth + sectorWidth}`
        }
    }
    return board;
}

let sectors = generateSectors( sectorsCount );

function createElem( tag ) {
    return document.createElement( tag );
}

function addClass( el, cl ) {
    return el.classList.add( cl );
}

let firstPartWheelDiv = createElem( "div" );
let secondPartWheelDiv = createElem( "div" );

let sectorWrapSemiDivFirst = createElem( "div" );
let sectorWrapSemiDivSecond = createElem( "div" );

addClass( sectorWrapSemiDivFirst, "sector-wrapper" );
addClass( sectorWrapSemiDivFirst, "semi-circleOne" );

addClass( sectorWrapSemiDivSecond, "sector-wrapper" );
addClass( sectorWrapSemiDivSecond, "semi-circleTwo" );

addClass( firstPartWheelDiv, "semi-wheel-wrapper" );
addClass( firstPartWheelDiv, "first-part-wheel" );

addClass( secondPartWheelDiv, "semi-wheel-wrapper" );
addClass( secondPartWheelDiv, "second-part-wheel" );

firstPartWheelDiv.appendChild( sectorWrapSemiDivFirst );
secondPartWheelDiv.appendChild( sectorWrapSemiDivSecond );

app.appendChild( firstPartWheelDiv );
app.appendChild( secondPartWheelDiv );

for ( let i = 0; i < splitInHalf; i++ ) {
    let sector = createElem( "div" );
    let p = createElem( "p" );

    addClass( sector, `sector-${i}` ); // sectors 0 - 1 - 2 
    addClass( sector, "sector" );

    p.textContent = sectors[ `id-${sectorsCount - 1 - i}` ][ "prize" ]; // prize 18 - 17 - 16

    sector.appendChild( p );
    sectorWrapSemiDivFirst.appendChild( sector )
}


for ( let i = 0; i < splitInHalf; i++ ) {

    let sector = createElem( "div" );
    let p = createElem( "p" );

    addClass( sector, `sector-${sectorsCount - 1 - i}` ); // sectors 17 - 16 - 15
    addClass( sector, "sector" );

    p.textContent = sectors[ `id-${i}` ][ "prize" ]; // prize 0 - 1 - 2


    sector.appendChild( p );
    sectorWrapSemiDivSecond.appendChild( sector );
}



let tenTurns = [];
let sectorsWith2x = [];
let hitters = [];
let lastSector;
let sectorObj;

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


function rotateWheel( currentSector, sectors ) {
    currStatus.textContent = "Spinning...";

    let deg = sectors[ `id-${currentSector}` ][ "startDeg" ] + ( 4 * 360 ) + getRandomNum( 1, 20 );

    TweenMax.to( "#wheel-wrapper", 6, { rotation: `${deg}`, ease: Power3.easeInOut } );

    deg = parseInt( deg ) % 360;

    btn.disabled = true;

    setTimeout( () => {
        resetWheel( currentSector, sectors, deg )
    }, 6000 );
}

function resetWheel( sector, sectors, deg ) {
    TweenMax.to( "#wheel-wrapper", 0, { rotation: `${deg}`, ease: Power3.easeInOut } );

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

function modifyAsPerLastSector( sec ) {
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

function getRandomNum( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min ) + min );
}

function checkPrevSectors( lastSector, currentSector ) {
    if ( lastSector === currentSector ) {
        return currentSector = modifyAsPerLastSector( currentSector );
    }
    return currentSector
}

function resetHitters() {
    return hitters = [];
}

function resetTenTurnsArr() {
    return tenTurns = [];
}

function isCurrSectorAlready2x( arr, currentSector ) {
    return arr.find( x => x[ 0 ] === `id-${currentSector}` );
}

const cond1 = ( sectorsWith2x, sectorObj, currentSector ) => {                                // Condition 1
    if ( sectorsWith2x.length === 2 && sectorObj ) {
        conditionsMap[ "condition1" ] = true;
        x3Sector = currentSector;
        x2Sector = lastSector;
    }
}

const cond2 = ( sectorsWith2x, sectorObj ) => {                                // Condition 2
    if ( sectorsWith2x.length === 1 && sectorObj ) {
        conditionsMap[ "condition2" ] = true;
        x3Sector = currentSector;
    }
}

const cond3 = ( sectorsWith2x, currentSector ) => {                                // Condition 3 
    if ( sectorsWith2x.length === 2 && sectors[ `id-${currentSector}` ][ "hits" ] === 1 ) {
        conditionsMap[ "condition3" ] = true;
    }
}

const cond4 = ( sectorsWith2x, tenTurns ) => {                                // Condition 4
    if ( sectorsWith2x.length === 0 && tenTurns.length >= 7 ) {
        conditionsMap[ "condition4" ] = true;
    }
}

const cond5 = ( sectorsWith2x, tenTurns ) => {                                // Condition 5
    if ( sectorsWith2x.length === 1 && tenTurns.length >= 7 ) {
        conditionsMap[ "condition5" ] = true;
    }
}

const cond6 = ( x2Sector, x3Sector ) => {                                // Condition 6
    if ( x2Sector && x3Sector ) {
        conditionsMap[ "condition6" ] = true;
    }
}

const cond7 = ( sectorsWith2x, tenTurns ) => {                                // Condition 7
    if ( sectorsWith2x.length === 2 && tenTurns.length === 9 ) {
        conditionsMap[ "condition7" ] = true;
    }
}

const cond8 = ( x3Sector, tenTurns ) => {                                // Condition 8
    if ( x3Sector && tenTurns.length === 9 ) {
        conditionsMap[ "condition8" ] = true;
    }
}

function turnBasedLoop() {

    const min = 0;
    const max = sectorsCount;

    let x2Sector;
    let x3Sector;

    if ( tenTurns.length >= 10 ) {
        resetTenTurnsArr();
        resetHitters();
        sectors = generateSectors( sectorsCount );
    }

    let currentSector = getRandomNum( min, max );


    if ( lastSector ) {
        currentSector = checkPrevSectors( lastSector, currentSector );
    }

    let sectorsWith2x = hitters.filter( x => x[ 1 ][ "hits" ] === 2 );

    sectorObj = isCurrSectorAlready2x( sectorsWith2x, currentSector );

    cond1( sectorsWith2x, sectorObj );
    cond2( sectorsWith2x, sectorObj );
    cond3( sectorsWith2x, currentSector );
    cond4( sectorsWith2x, tenTurns );
    cond5( sectorsWith2x, tenTurns );
    cond6( x2Sector, x3Sector );
    cond7( sectorsWith2x, tenTurns );
    cond8( x3Sector, tenTurns );

    if ( conditionsMap[ "condition1" ] || conditionsMap[ "condition2" ] || conditionsMap[ "condition3" ] || conditionsMap[ "condition6" ] ) {
        let zeroHitters = Object.entries( sectors ).filter( x => x[ 1 ][ "hits" ] === 0 );

        let firstIndex = 0;
        let lastIndex = zeroHitters.length;

        let currentSectorIndex = getRandomNum( firstIndex, lastIndex );

        currentSector = Number( zeroHitters[ currentSectorIndex ][ 0 ].match( /\d+/g ).join() );
    }

    if ( conditionsMap[ "condition4" ] || conditionsMap[ "condition5" ] || conditionsMap[ "condition8" ] ) {
        let oneHitsArr = Object.entries( sectors ).filter( x => x[ 1 ][ "hits" ] === 1 );

        let firstIndex = 0;
        let lastIndex = oneHitsArr.length;

        let currentSectorIndex = getRandomNum( firstIndex, lastIndex );

        currentSector = Number( oneHitsArr[ currentSectorIndex ][ 0 ].match( /\d+/g ).join() );
    }


    if ( conditionsMap[ "condition7" ] ) {
        currentSector = Number( sectorsWith2x[ 0 ][ 0 ].match( /\d+/g ).join() );

        if ( currentSector === lastSector ) {
            currentSector = Number( sectorsWith2x[ 1 ][ 0 ].match( /\d+/g ).join() );
        }
    }

    rotateWheel( currentSector, sectors );
    hitSector( currentSector, sectors );

    lastSector = currentSector;

    tenTurns.push( Object.entries( sectors )[ lastSector ] );

    hitters = Array.from( new Set( tenTurns.map( x => JSON.stringify( x ) ) ) ).map( x => JSON.parse( x ) );
    console.log( hitters )

    for ( const x in conditionsMap ) {
        conditionsMap[ x ] = false;
    }
}


