const { Files } = require('../utils/file');
const fileDir = `${__dirname}/../../files`;
const ContentTopApi = {
  async getPageData(filePath, url) {
    const json = await Files.readJson(filePath);
    const data = JSON.parse(json);
    return { url: data.url || url, title: data.content[0], content: data.content[1] };
  },
  async getCurrentPageData(req, res, params) {
    const { path } = params;
    const { url, title, content } = await this.getPageData(`${fileDir}/${path}.json`, path);
    return res.send({ url, title, content });
  },
  async similarPost(req, res) {
    const similarPost = [
      {
        url: '/single-page',
        title: 'Gaming Post 1',
        summary: 'This is a really long fake summary, this can help developer to see how long it can go and how the wrap words will work'
      },
      {
        url: '/single-page',
        title: 'Gaming Post 2',
        summary: 'This is a really long fake summary, this can help developer to see how long it can go and how the wrap words will work'
      },
      {
        url: '/single-page',
        title: 'Gaming Post 3',
        summary: 'This is a really long fake summary, this can help developer to see how long it can go and how the wrap words will work'
      },
      {
        url: '/single-page',
        title: 'Gaming Post 4',
        summary: 'This is a really long fake summary, this can help developer to see how long it can go and how the wrap words will work'
      }
    ];
    return res.send({ similarPost });
  },
  async getFileRoutes(req, res) {
    const files = Files.readDir(fileDir);
    const routes = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = JSON.parse(Files.readJson(`${fileDir}/${file}`));
      routes.push({
        url: data.url,
        title: data.content[0]
      });
    }
    return res.send({ routes });
  }
}

module.exports = ContentTopApi;
