import fetch from 'node-fetch';
import xml2js from 'xml2js';

export default async function handler(req, res) {
    try {
        const { city, pair } = req.query;

        if (!city || !pair) {
            return res.status(400).json({ error: 'Параметры city и pair обязательны.' });
        }

        const [fromCurrency, toCurrency] = pair.toUpperCase().split('/');

        const url = 'https://keine-exchange.com/request-exportxml.xml';

        // Загружаем данные
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Ошибка при загрузке XML:', response.statusText);
            return res.status(500).json({ error: 'Не удалось загрузить XML.' });
        }

        const xml = await response.text();

        // Парсим XML
        const parser = new xml2js.Parser();
        const data = await parser.parseStringPromise(xml);

        const items = data?.rates?.item || [];

        // Проверяем, есть ли элементы
        if (!items.length) {
            console.error('Нет элементов в XML');
            return res.status(404).json({ error: 'Курсы не найдены.' });
        }

        // Находим курс для заданного города и валютной пары
        const rate = items.find(item => 
            item.city && item.city[0].toUpperCase() === city.toUpperCase() &&
            item.from && item.from[0].toUpperCase() === fromCurrency &&
            item.to && item.to[0].toUpperCase() === toCurrency
        );

        if (rate) {
            return res.json({
                city: rate.city[0],
                from: rate.from[0],
                to: rate.to[0],
                in: rate.in[0],   // Покупка
                out: rate.out[0]  // Продажа
            });
        } else {
            console.error('Курс не найден для города и пары');
            return res.status(404).json({ error: 'Курс не найден.' });
        }
    } catch (error) {
        console.error('Ошибка на сервере:', error);
        return res.status(500).json({ error: 'Ошибка на сервере.', details: error.message });
    }
}
