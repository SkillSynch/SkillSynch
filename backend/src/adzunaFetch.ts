import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function fetchDescription(url: string): Promise<string> {
  const response = await axios(url);
  const html = response.data;
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  let description = '';
  scripts.forEach(script => {
    if (!script.textContent) return;

    const json = JSON.parse(script.textContent);

    if (json.description) {
      description = json.description;
    }
  });

  return description;
}
