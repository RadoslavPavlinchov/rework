class Wheel {
    constructor( sectorsCount ) {

        this.sectorsCount = sectorsCount;
        this.sectorWidth = 360 / this.sectorsCount;
        this.splitInHalf = this.sectorsCount / 2;
        this.tenTurns = [];
        this.sectorsWith2x = [];
        this.hitters = [];
        this.currentSector;
        this.lastSector;
        this.sectorObj;
        this.sectors = this.generateSectors( sectorsCount );

        this.conditionsMap = {
            condition1: false,
            condition2: false,
            condition3: false,
            condition4: false,
            condition5: false,
            condition6: false,
            condition7: false,
            condition8: false
        }
    }

    generateSectors( secCount ) {
        let board = {};

        for ( let i = 0; i < secCount; i++ ) {
            board[ `id-${i}` ] = {
                prize: `${i + 1}`,
                hits: 0,
                startDeg: +`${this.sectorWidth * i}`,
                endDeg: +`${i * this.sectorWidth + this.sectorWidth}`
            }
        }
        return board;
    }

    createElem( tag ) {
        return document.createElement( tag );
    }

    addClass( el, cl ) {
        return el.classList.add( cl );
    }

    rotateWheel( currentSector ) {
        let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];
        let currStatus = document.getElementsByClassName( "status" )[ 0 ];

        currStatus.textContent = "Spinning...";

        let deg = this.sectors[ `id-${currentSector}` ][ "startDeg" ] + ( 4 * 360 ) + this.getRandomNum( 1, 20 );

        TweenMax.to( "#wheel-wrapper", 6, { rotation: `${deg}`, ease: Power3.easeInOut } );

        deg = parseInt( deg ) % 360;

        btn.disabled = true;

        setTimeout( () => {
            this.resetWheel( currentSector, this.sectors, deg )
        }, 6000 );
    }

    resetWheel( sector, sectors, deg ) {
        let btn = document.getElementsByClassName( "spin-btn" )[ 0 ];
        let currStatus = document.getElementsByClassName( "status" )[ 0 ];

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


    modifyAsPerLastSector( sec ) {
        if ( sec + 1 > 18 ) {
            return sec -= 1
        }
        return sec += 1;
    }

    hitSector( sector ) {
        let arr = Object.entries( this.sectors )

        for ( let i = 0; i < arr.length; i++ ) {
            let id = arr[ i ][ 0 ];
            if ( id === `id-${sector}` ) {
                arr[ i ][ 1 ][ "hits" ]++;
            }
        }
    }

    getRandomNum( min, max ) {
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min ) + min );
    }

    checkPrevSectors() {
        if ( this.lastSector === this.currentSector ) {
            return this.currentSector = this.modifyAsPerLastSector( this.currentSector );
        }
        return this.currentSector
    }

    resetHitters() {
        return this.hitters = [];
    }

    resetTenTurnsArr() {
        return this.tenTurns = [];
    }

    isCurrSectorAlready2x( arr ) {
        return arr.find( x => x[ 0 ] === `id-${this.currentSector}` );
    }

    lockSector2xAnd3x() { // Condition 1
        if ( this.sectorsWith2x.length === 2 && this.sectorObj ) {
            this.conditionsMap[ "condition1" ] = true;
            x3Sector = this.currentSector;
            x2Sector = this.lastSector;
        }
    }

    lockSector3x() { // Condition 2
        if ( this.sectorsWith2x.length === 1 && this.sectorObj ) {
            this.conditionsMap[ "condition2" ] = true;
            x3Sector = this.currentSector;
        }
    }

    checkForOneHitters() { // Condition 3 
        if ( this.sectorsWith2x.length === 2 && this.sectors[ `id-${this.currentSector}` ][ "hits" ] === 1 ) {
            this.conditionsMap[ "condition3" ] = true;
        }
    }

    completeAfterTurnSevenZeroHitters() { // Condition 4
        if ( this.sectorsWith2x.length === 0 && this.tenTurns.length >= 7 ) {
            this.conditionsMap[ "condition4" ] = true;
        }
    }

    completeAfterTurnSevenOneHitters() { // Condition 5
        if ( this.sectorsWith2x.length === 1 && this.tenTurns.length >= 7 ) {
            this.conditionsMap[ "condition5" ] = true;
        }
    }

    completeIfX2AndX3( x2Sector, x3Sector ) { // Condition 6
        if ( x2Sector && x3Sector ) {
            this.conditionsMap[ "condition6" ] = true;
        }
    }

    completeAfterTurnNine() { // Condition 7
        if ( this.sectorsWith2x.length === 2 && this.tenTurns.length === 9 ) {
            this.conditionsMap[ "condition7" ] = true;
        }
    }

    completeAfterTurnNineWithX3( x3Sector ) { // Condition 8
        if ( x3Sector && this.tenTurns.length === 9 ) {
            this.conditionsMap[ "condition8" ] = true;
        }
    }

    generateBoard() {
        let app = document.getElementById( "wheel-wrapper" );
        let firstPartWheelDiv = this.createElem( "div" );
        let secondPartWheelDiv = this.createElem( "div" );
        let sectorWrapSemiDivFirst = this.createElem( "div" );
        let sectorWrapSemiDivSecond = this.createElem( "div" );

        this.addClass( sectorWrapSemiDivFirst, "sector-wrapper" );
        this.addClass( sectorWrapSemiDivFirst, "semi-circleOne" );

        this.addClass( sectorWrapSemiDivSecond, "sector-wrapper" );
        this.addClass( sectorWrapSemiDivSecond, "semi-circleTwo" );

        this.addClass( firstPartWheelDiv, "semi-wheel-wrapper" );
        this.addClass( firstPartWheelDiv, "first-part-wheel" );

        this.addClass( secondPartWheelDiv, "semi-wheel-wrapper" );
        this.addClass( secondPartWheelDiv, "second-part-wheel" );

        firstPartWheelDiv.appendChild( sectorWrapSemiDivFirst );
        secondPartWheelDiv.appendChild( sectorWrapSemiDivSecond );

        app.appendChild( firstPartWheelDiv );
        app.appendChild( secondPartWheelDiv );

        for ( let i = 0; i < this.splitInHalf; i++ ) {
            let sector = this.createElem( "div" );
            let p = this.createElem( "p" );

            this.addClass( sector, `sector-${i}` ); // sectors 0 - 1 - 2 
            this.addClass( sector, "sector" );

            p.textContent = this.sectors[ `id-${this.sectorsCount - 1 - i}` ][ "prize" ]; // prize 18 - 17 - 16

            sector.appendChild( p );

            sector.style.backgroundColor = "#54478c";
            sector.style.zIndex = `${10 + i}`
            sector.style.transform = "rotate(" + ( i * this.sectorWidth ) + "deg)";

            sectorWrapSemiDivFirst.appendChild( sector )
        }


        for ( let i = 0; i < this.splitInHalf; i++ ) {

            let sector = this.createElem( "div" );
            let p = this.createElem( "p" );

            this.addClass( sector, `sector-${this.sectorsCount - 1 - i}` ); // sectors 17 - 16 - 15
            this.addClass( sector, "sector" );

            p.textContent = this.sectors[ `id-${i}` ][ "prize" ]; // prize 0 - 1 - 2

            sector.appendChild( p );
            sectorWrapSemiDivSecond.appendChild( sector );
        }
    }

    turnBasedLoop() {
        const min = 0;
        const max = this.sectorsCount;

        let x2Sector;
        let x3Sector;

        if ( this.tenTurns.length >= 10 ) {
            this.resetTenTurnsArr();
            this.resetHitters();
            this.sectors = this.generateSectors( this.sectorsCount );
        }

        this.currentSector = this.getRandomNum( min, max );

        if ( this.lastSector ) {
            this.currentSector = this.checkPrevSectors( this.lastSector, this.currentSector );
        }

        this.sectorsWith2x = this.hitters.filter( x => x[ 1 ][ "hits" ] === 2 );

        this.sectorObj = this.isCurrSectorAlready2x( this.sectorsWith2x, this.currentSector );

        this.lockSector2xAnd3x( this.sectorsWith2x, this.sectorObj );
        this.lockSector3x( this.sectorsWith2x, this.sectorObj );
        this.checkForOneHitters( this.sectorsWith2x, this.currentSector );
        this.completeAfterTurnSevenZeroHitters( this.sectorsWith2x, this.tenTurns );
        this.completeAfterTurnSevenOneHitters( this.sectorsWith2x, this.tenTurns );
        this.completeIfX2AndX3( x2Sector, x3Sector );
        this.completeAfterTurnNine( this.sectorsWith2x, this.tenTurns );
        this.completeAfterTurnNineWithX3( x3Sector, this.tenTurns );

        if ( this.conditionsMap[ "condition1" ] || this.conditionsMap[ "condition2" ] || this.conditionsMap[ "condition3" ] || this.conditionsMap[ "condition6" ] ) {
            let zeroHitters = Object.entries( this.sectors ).filter( x => x[ 1 ][ "hits" ] === 0 );

            let firstIndex = 0;
            let lastIndex = zeroHitters.length;

            let currentSectorIndex = this.getRandomNum( firstIndex, lastIndex );

            this.currentSector = Number( zeroHitters[ currentSectorIndex ][ 0 ].match( /\d+/g ).join() );
        }

        if ( this.conditionsMap[ "condition4" ] || this.conditionsMap[ "condition5" ] || this.conditionsMap[ "condition8" ] ) {
            let oneHitsArr = Object.entries( this.sectors ).filter( x => x[ 1 ][ "hits" ] === 1 );

            let firstIndex = 0;
            let lastIndex = oneHitsArr.length;

            let currentSectorIndex = this.getRandomNum( firstIndex, lastIndex );

            this.currentSector = Number( oneHitsArr[ currentSectorIndex ][ 0 ].match( /\d+/g ).join() );
        }


        if ( this.conditionsMap[ "condition7" ] ) {
            this.currentSector = Number( this.sectorsWith2x[ 0 ][ 0 ].match( /\d+/g ).join() );

            if ( this.currentSector === this.lastSector ) {
                this.currentSector = Number( this.sectorsWith2x[ 1 ][ 0 ].match( /\d+/g ).join() );
            }
        }

        this.rotateWheel( this.currentSector, this.sectors );
        this.hitSector( this.currentSector, this.sectors );

        this.lastSector = this.currentSector;

        this.tenTurns.push( Object.entries( this.sectors )[ this.lastSector ] );

        this.hitters = Array.from( new Set( this.tenTurns.map( x => JSON.stringify( x ) ) ) ).map( x => JSON.parse( x ) );

        for ( const x in this.conditionsMap ) {
            this.conditionsMap[ x ] = false;
        }
        console.log( this.tenTurns )
    }
}

let application = new Wheel( 18 );
document.addEventListener( 'DOMContentLoaded', application.generateBoard() )
document.getElementsByClassName( "spin-btn" )[ 0 ].addEventListener( "click", () => { application.turnBasedLoop() } )



