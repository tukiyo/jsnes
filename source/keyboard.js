/*
JSNES, based on Jamie Sanders' vNES
Copyright (C) 2010 Ben Firshman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Keyboard events are bound in the UI
JSNES.Keyboard = function() {
    var i;
    
    this.keys = {
        KEY_A: 0,
        KEY_B: 1,
        KEY_SELECT: 2,
        KEY_START: 3,
        KEY_UP: 4,
        KEY_DOWN: 5,
        KEY_LEFT: 6,
        KEY_RIGHT: 7
    };

    this.state1 = new Array(8);
    for (i = 0; i < this.state1.length; i++) {
        this.state1[i] = 0x40;
    }
    this.state2 = new Array(8);
    for (i = 0; i < this.state2.length; i++) {
        this.state2[i] = 0x40;
    }
};

JSNES.Keyboard.prototype = {
    setKey: function(key, value) {
        switch (key) {
            case 75: this.state1[this.keys.KEY_A] = value; break;      // K
            case 74: this.state1[this.keys.KEY_B] = value; break;      // J
            case 190: this.state1[this.keys.KEY_SELECT] = value; break; // .
            case 188: this.state1[this.keys.KEY_START] = value; break;  // ,
            case 13: this.state1[this.keys.KEY_START] = value; break;  // Enter
            case 69: this.state1[this.keys.KEY_UP] = value; break;     // e
            case 68: this.state1[this.keys.KEY_DOWN] = value; break;   // d
            case 83: this.state1[this.keys.KEY_LEFT] = value; break;   // s
            case 70: this.state1[this.keys.KEY_RIGHT] = value; break;  // f

            case 103: this.state2[this.keys.KEY_A] = value; break;     // Num-7
            case 105: this.state2[this.keys.KEY_B] = value; break;     // Num-9
            case 99: this.state2[this.keys.KEY_SELECT] = value; break; // Num-3
            case 97: this.state2[this.keys.KEY_START] = value; break;  // Num-1
            case 104: this.state2[this.keys.KEY_UP] = value; break;    // Num-8
            case 98: this.state2[this.keys.KEY_DOWN] = value; break;   // Num-2
            case 100: this.state2[this.keys.KEY_LEFT] = value; break;  // Num-4
            case 102: this.state2[this.keys.KEY_RIGHT] = value; break; // Num-6
            default: return true;
        }
        return false; // preventDefault
    },

    keyDown: function(evt) {
        if (!this.setKey(evt.keyCode, 0x41) && evt.preventDefault) {
            evt.preventDefault();
        }
    },
    
    keyUp: function(evt) {
        if (!this.setKey(evt.keyCode, 0x40) && evt.preventDefault) {
            evt.preventDefault();
        }
    },
    
    keyPress: function(evt) {
        evt.preventDefault();
    }
};
