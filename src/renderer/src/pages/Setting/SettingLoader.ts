export const SettingLoader = async () => {
  const config = (await window.api.sql(
    `SELECT * FROM config WHERE id=1`,
    'findOne',
    {}
  )) as ContentType
  return JSON.parse(config.content)
}
