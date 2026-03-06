let audioEngine = {
  sounds: {
    bgMusic: null,
    jumpSnd: null,
    groundSnd: null,
    deathSnd: null,
  },
  loadAllSounds: async function() {
    this.sounds.bgMusic = await loadSound("./media/bgmusic.mp3");
    this.sounds.bgMusic.loop(true);
    this.sounds.deathSnd = await loadSound("./media/GameOver.mp3");
    this.sounds.jumpSnd = await loadSound("./media/Jump.wav");
    this.sounds.groundSnd = await loadSound("./media/hitGround.wav");
  }
};
