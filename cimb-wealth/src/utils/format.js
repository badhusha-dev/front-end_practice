export function maskAccount(account) {
  if (!account) return ''
  const last4 = account.slice(-4)
  return account.replace(/.(?=.{4})/g, '*').slice(0, -4) + last4
}


