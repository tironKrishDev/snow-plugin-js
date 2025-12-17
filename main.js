$(function () {
  var snow = $("#snow-container").data("snowfall");

  // Control methods
  snow.start(); // Start animation
  snow.stop(); // Stop animation
  snow.clear(); // Clear all flakes
  snow.destroy(); // Remove completely
  snow.isRunning(); // Check status

  // Protected metadata
  snow.getAuthor(); // Returns: "Tiron Krishantha"
  snow.getVersion(); // Returns: "2.0.0"
  snow.getChecksum(); // Returns: Integrity checksum


  $('#snow-container').snowfall({
  densityFactor: 100,
  speedAdjust: 5,
  minSize: 2,
  maxSize: 12,
  drift: 30,
  useOpacityLevels: true,
  showCredit: true  // Show developer credit
});
});
