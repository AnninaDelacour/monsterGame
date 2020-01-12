new Vue ({
    el: "#monsterSlayer",
    data: {
        show: true,
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        maxWidth: 350 + 'px',
    },
    methods: {
        randomNumber: function(min, max) {
            return Math.floor(Math.random() * (max -min +1)) + min;
        }
    }
});