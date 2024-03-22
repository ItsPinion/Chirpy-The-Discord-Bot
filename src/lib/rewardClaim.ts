export function checkDailyRewardClaim(today: Date, lastClaimedDate: Date) {
  if (!lastClaimedDate) return false;
  const lastClaimed = new Date(lastClaimedDate);
  return (
    today.getDate() === lastClaimed.getDate() &&
    today.getMonth() === lastClaimed.getMonth() &&
    today.getFullYear() === lastClaimed.getFullYear()
  );
}
export function checkYearlyRewardClaim(today: Date, lastClaimedDate: Date) {
  if (!lastClaimedDate) return false;
  const lastClaimed = new Date(lastClaimedDate);
  return today.getFullYear() === lastClaimed.getFullYear();
}

export function checkMonthlyRewardClaim(today: Date, lastClaimedDate: Date) {
  if (!lastClaimedDate) return false;
  const lastClaimed = new Date(lastClaimedDate);
  return (
    today.getMonth() === lastClaimed.getMonth() &&
    today.getFullYear() === lastClaimed.getFullYear()
  );
}
