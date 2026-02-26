let audioEngine = {
  sounds: {},
  loadAllSounds: async function() {
    this.sounds.bgMusic = await loadSound("./media/Game Music 2 Bounce 2.mp3");
    this.sounds.bgMusic.loop(true);

    this.sounds.jump = await loadSound("./media/Jump.wav");
    this.sounds.groundHit = await loadSound("./media/Ground Hit.wav");
  }
};