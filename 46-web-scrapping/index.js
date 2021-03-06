const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
      //toda essa funcao sera executada no browser

      //vamos pegar todas as imagens que estao de posts
        const nodeList = document.querySelectorAll('article img')
      //tranformar o nodelist em array
        const imgArray = [...nodeList]
      //transformar os dados (elementos html) em objetos JS
        const imgList = imgArray.map( ({src}) => ({
            src
        }))

        //colocar para fora a funcao
        return imgList
  });

  //escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('something went wrong')

      console.log('well done!')
  })


  //await page.screenshot({path: 'rocketseat.png'});
 
  //await browser.close();
})();