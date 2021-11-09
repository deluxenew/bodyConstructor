import {BoxGeometry, Group, Mesh, MeshStandardMaterial, TextureLoader} from "three";

const colors = [
  {
    id: 'dub_votan',
    url: require('./img/facades/ldsp/dub_votan.webp'),
    name: 'Дуб вотан',
    fasade: 'ldsp',
    type: 'laminate'
  },
  {
    id: 'yasen_ankor_sseryi',
    url: require('./img/facades/ldsp/yasen_ankor_sseryi.webp'),
    name: 'Ясень Анкор серый',
    fasade: 'ldsp',
    type: 'laminate'
  },
  {
    id: 'listvennica',
    url: require('./img/facades/mdf/listvennica.webp'),
    name: 'Лиственница',
    fasade: 'mdf',
    type: 'laminate'
  },
  {
    id: 'orex_mramornyi',
    url: require('./img/facades/mdf/orex_mramornyi.webp'),
    name: 'Орех мраморный',
    fasade: 'mdf',
    type: 'laminate'
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

const getColorById = (colorId) => {
  const color = colors.find(({id}) => colorId === id)
  if (color) return color.url
  return ''
}

const getFacade = (colorId, width, height) => {
  const url = getColorById(colorId)
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

const ldsp = (colorId, width, height) => {
  const facade = getFacade(colorId, width, height)
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

const mdf = (colorId, width, height) => {
  const facade = getFacade(colorId, width, height)
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

const getFacadeByColorId = (colorId) => {
  const color = colors.find(({id}) => colorId === id)
  if (color) return color
}

export default {
  getFacadeByColorId,
  ldsp,
  mdf
}
