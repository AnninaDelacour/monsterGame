new Vue({
    el: "#monsterSlayer",
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        maxWidth: 350 + 'px',
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack() {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            }); //unshift schiebt quasi alle Items nach rechts und ordnet sich als erstes im Array ein

            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();


        },

        specialAttack() {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },

        heal() {
            if (this.playerHealth <= 90) { //Ist der User unter 90, bekommt er 10 Healingpunkte. Ist er darüber, passiert nichts bzw.
                // attackiert das Monster weiter.
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });

            this.monsterAttack();
        },

        reset() {
            this.gameIsRunning = false;
        },

        monsterAttack() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            //Outsourced als eigene Funktion, um den Code insgesamt zu verkürzen
            //keine doppelten Codes!!
        },

        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin(min, max) {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true; //exit out of Game
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost :( New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});