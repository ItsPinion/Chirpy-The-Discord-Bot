function checkDailyRewardClaim(today, lastClaimedDate) {
  if (!lastClaimedDate) return false; // No previous claim, so they haven't claimed it yet
  const lastClaimed = new Date(lastClaimedDate);
  return (
    today.getDate() === lastClaimed.getDate() &&
    today.getMonth() === lastClaimed.getMonth() &&
    today.getFullYear() === lastClaimed.getFullYear()
  );
}
function checkYearlyRewardClaim(today, lastClaimedDate) {
    if (!lastClaimedDate) return false; // No previous claim, so they haven't claimed it yet
    const lastClaimed = new Date(lastClaimedDate);
    return today.getFullYear() === lastClaimed.getFullYear();
  }
  

function checkMonthlyRewardClaim(today, lastClaimedDate) {
  if (!lastClaimedDate) return false; // No previous claim, so they haven't claimed it yet
  const lastClaimed = new Date(lastClaimedDate);
  return (
    today.getMonth() === lastClaimed.getMonth() &&
    today.getFullYear() === lastClaimed.getFullYear()
  );
}
module.exports = {
  checkDailyRewardClaim,
  checkYearlyRewardClaim,
  checkMonthlyRewardClaim,
};
