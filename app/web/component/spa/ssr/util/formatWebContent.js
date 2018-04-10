export const getWebContent = (content, isSupportWebp = false) => {
  /*一些标签替换等操作
  */
  const webContent = content.replace(/(.jpg|.jpeg|.bmp|.tiff|.png)/g, `$1?x-oss-process=image/resize,m_fill,w_1500/format,${isSupportWebp === 'true' ? 'webp' : 'png'}/auto-orient,1`);
  return webContent;
}

export const createHtml = (content, isSupportWebp = false) => {
  return {__html: getWebContent(content, isSupportWebp)};
}
