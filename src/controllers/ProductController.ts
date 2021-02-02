import { Request, Response } from 'express';

export = {

  async index(req: Request, res: Response) {
    const products = [{
      id: 'placahomenagem',
      name: 'Placa de Homenagem',
      description: '',
      hasCustomFormat: true,
      images: ['product1.jpg', 'product1.jpg'],
      category: ['placahomenagem'],
      price: 150.0,
      measure: 'un',
      attributes: [
        {
          key: 'size',
          name: 'Tamanho',
          visible: true,
          options: [
            {
              key: '10x15',
              name: '10 x 15cm',
              position: 0,
              image: '10x15.jpg',
            },
            {
              key: '21x15',
              name: '21 x 15cm',
              position: 1,
              image: '21x15.jpg',
            },
          ],
        },
        {
          key: 'material',
          name: 'Materiais',
          visible: true,
          options: [
            {
              key: 'acoinox',
              name: 'Aço Inox Escovado',
              position: 0,
              show: [0, 1],
              image: 'aco-inox-escovado-placa-homenagem.png',
              price: {
                '10x15': 45.0,
                '21x15': 70.0,
                '30x20': 120.0,
              },
            },
            {
              key: 'acrilico',
              name: 'Acrílico',
              image: 'acrilico-placa-homenagem.png',
              position: 1,
              show: [0, 1],
            },
          ],
        },
        {
          key: 'process',
          name: 'Processo',
          visible: true,
          options: [
            {
              key: 'gravacaorelevo',
              name: 'Gravação Alto Relevo',
              image: 'alto-relevo-placa-homenagem.png',
              position: 0,
              show: [0],
              price: 0.0,
            },
            {
              key: 'impressaouv',
              name: 'Impressão UV',
              position: 1,
              show: [1],
              price: 0.0,
            },
          ],
        },
        {
          key: 'model',
          name: 'Modelo Estojo',
          visible: true,
          options: [
            {
              key: 'deluxe',
              name: 'Modelo Luxo',
              position: 0,
              show: [0, 1],
              price: {
                acoinox: {
                  '10x15': 25.0,
                  '21x15': 45.0,
                  '30x20': 60.0,
                },
              },
            },
            {
              key: 'capa',
              name: 'Modelo Capa',
              position: 0,
              show: [0, 1],
              price: {
                acoinox: {
                  '10x15': 0.0,
                  '21x15': 0.0,
                  '30x20': 0.0,
                },
              },
            },
          ],
        },
      ],
    }];

    return res.json(products);
  },
}
