chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const googleMapsUrlPattern = /^https:\/\/(www\.)?google\.[a-z]+\/maps\/?\?(.*)$/;
    const yandexMapsUrl = 'https://yandex.ru/maps/?source=serp_navig&from=tabbar';

    const match = details.url.match(googleMapsUrlPattern);
    if (match) {
      const queryParams = new URLSearchParams(match[2]);
      const searchText = queryParams.get('q') || queryParams.get('daddr');
      if (searchText) {
        return {
          redirectUrl: `${yandexMapsUrl}&text=${encodeURIComponent(searchText)}`
        };
      } else {
        return { redirectUrl: yandexMapsUrl };
      }
    }
  },
  { urls: ['*://www.google.com/maps*', '*://maps.google.com/maps*'] },
  ['blocking']
);
