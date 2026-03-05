let audioEngine = {
  sounds: {},
  loadAllSounds: async function() {
    let bgMusic = await loadSound("./media/sing a song singyyyy.mp3");
    bgMusic.loop(true);

    let jumpSnd = await loadSound("./media/Jump.wav");
    let groundHit = await loadSound("./media/Ground Hit.wav");
  }
};
//i am byant 