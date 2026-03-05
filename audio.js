let audioEngine = {
  sounds: {
    bgMusic: null,
  },
  loadAllSounds: async function() {
    this.sounds.bgMusic = await loadSound("./media/bgmusic.mp3");
    this.sounds.bgMusic.loop(true);

    //let jumpSnd = await loadSound("./media/Jump.wav");
    //let groundHit = await loadSound("./media/Ground Hit.wav");
  }
};
