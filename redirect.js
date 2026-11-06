export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  const offerId = url.searchParams.get('offer') || url.searchParams.get('offer_id');
  const pid = url.searchParams.get('pid') || '57';
  const targetUrl = url.searchParams.get('preview') || url.searchParams.get('target');
  
  const clickid = url.searchParams.get('clickid') || url.searchParams.get('click_id') || '';
  const sourceid = url.searchParams.get('sourceid') || '';
  const gaid = url.searchParams.get('gaid') || '';
  const iosid = url.searchParams.get('iosid') || '';
  const appname = url.searchParams.get('appname') || '';
  const bundleid = url.searchParams.get('bundleid') || '';
  const creativeid = url.searchParams.get('creativeid') || '';
  const subpublisherid = url.searchParams.get('subpublisherid') || '';

  if (offerId && pid && targetUrl) {
    const affiseUrl = `https://digimcorps.g2afse.com/click?offer_id=${offerId}&pid=${pid}&sub1=${clickid}&sub2=${sourceid}&sub3=${gaid}&sub4=${iosid}&sub5=${appname}&sub6=${bundleid}&sub7=${creativeid}&sub8=${subpublisherid}`;

    try {
      // User ka real IP aur User-Agent Affise ko bhejo taaki click record ho jaye
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const clientUa = req.headers['user-agent'] || '';

      await fetch(affiseUrl, {
        headers: {
          'User-Agent': clientUa,
          'X-Forwarded-For': clientIp
        }
      });
    } catch (err) {
      console.error('Affise tracking error:', err);
    }
    
    // User ko chupchap target link (Play Store) par bhej do
    return res.redirect(302, targetUrl);
  } else {
    return res.redirect(302, targetUrl || 'https://google.com');
  }
}