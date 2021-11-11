import {BoxGeometry, Group, Mesh, MeshStandardMaterial, TextureLoader} from "three";

const colors = [
  {
    type: 'ldsp',
    typeName: 'ЛДСП',
    typeDescription: 'Ламинированная древесно - стружечная плита. Кромка 0,4 мм со всех сторон. Качественное покрытие. Устойчивость к температурным воздействиям. Упаковка: стрейч плёнка.',
    additional: null,
    items: null,
    variants: [
      {
        type: 'laminate',
        typeName: 'Ламинированный',
        typeDescription: 'Фасад с ламинированной пленкой на 5 граней',
        items: [
          {
            id: 'dub_votan',
            url: require('./img/facades/ldsp/dub_votan.webp'),
            name: 'Дуб вотан',
          },
          {
            id: 'yasen_ankor_sseryi',
            url: require('./img/facades/ldsp/yasen_ankor_sseryi.webp'),
            name: 'Ясень Анкор серый',
          },
        ]
      },
      {
        type: 'lacquered',
        typeName: 'Лакированный',
        typeDescription: 'Фасад с покраской и нанесением лака',
        items: [

        ]
      }
    ]
  },
  {
    type: 'mdf',
    typeName: 'МДФ',
    typeDescription: 'Ламинированная древесно - стружечная плита. Кромка 0,4 мм со всех сторон. Качественное покрытие. Устойчивость к температурным воздействиям. Упаковка: стрейч плёнка.',
    additional: null,
    items: null,
    variants: [
      {
        type: 'milled',
        typeName: 'Фрезерованный',
        typeDescription: 'Фасад с фрезерованными гранями и внутренним рельефом',
        items: [
          {
            id: 'listvennica',
            url: require('./img/facades/mdf/listvennica.webp'),
            name: 'Лиственница',
          },
          {
            id: 'orex_mramornyi',
            url: require('./img/facades/mdf/orex_mramornyi.webp'),
            name: 'Орех мраморный',
          },
        ]
      },
      {
        type: 'lacquered',
        typeName: 'Лакированный',
        typeDescription: 'Фасад с покраской и нанесением лака',
        items: [

        ]
      }
    ]
  },
]

const sideDepth = .3;

const getMaterial = (url) => {
  const facadeTextureLoader = new TextureLoader();

  const facadeMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    map: facadeTextureLoader.load(url),
  });

  const material = new MeshStandardMaterial({color: 0xffffff,});

  material.roughness = 0.3;
  material.metalness = 0.05;

  const facadeMaterials = [
    facadeMaterial,
    facadeMaterial,
    facadeMaterial,
    facadeMaterial,
    facadeMaterial,
    material,
  ];

  return facadeMaterials
}

const getFacade = (colorId, width, height, url) => {

  const material = getMaterial(url)

  const geometry = new BoxGeometry(width, height, sideDepth);
  const facade = new Mesh(geometry, material);
  const group = new Group()

  group.add(facade)

  group.name = 'facade'

  group.userData.width = width
  group.userData.height = height
  group.userData.colorId = colorId

  return group
}

const ldsp = (colorId, width, height, url) => {
  const facade = getFacade(colorId, width, height, url)
  // facade.position.set(0,0,0)
  facade.userData.facade = 'ldsp'
  facade.userData.facadeName = 'ЛДСП'
  facade.userData.facadeDescription = 'Ламинированная древесно - стружечная плита. Кромка 0,4 мм со всех сторон. Качественное покрытие. Устойчивость к температурным воздействиям. Упаковка: стрейч плёнка.'
  facade.userData.types = [{
    id: 'laminate',
    name: 'Ламинированный',
    description: 'Фасад с ламинированной пленкой на 5 граней'
  },
    {
      id: 'lacquered',
      name: 'Лакированный',
      description: 'Фасад с покраской и нанесением лака'
    }
  ]

  return facade
}

const mdf = (colorId, width, height, url) => {
  const facade = getFacade(colorId, width, height, url)
  facade.userData.facade = 'mdf'
  facade.userData.facadeName = 'МДФ'
  facade.userData.facadeDescription = 'Покрытие - пленка ПВХ. Высокая устойчивость к УФ - лучам, сколам, истиранию, воздействию чистящих средств, изменениям влажности и высоким температурам. Упаковка: стрейч плёнка.'
  facade.userData.types = [{
    id: 'milled',
    name: 'Фрезерованный',
    description: 'Фасад с фрезерованными гранями и внутренним рельефом'
  },
    {
      id: 'lacquered',
      name: 'Лакированный',
      description: 'Фасад с покраской и нанесением лака'
    }
  ]
  return facade
}

// const getFacadeByColorId = (colorId) => {
//   const color = colors.find(({id}) => colorId === id)
//   if (color) return color
// }

export default {
  colors,
  // getFacadeByColorId,
  ldsp,
  mdf
}
