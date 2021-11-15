import {BoxGeometry, Mesh, MeshStandardMaterial, Group, TextureLoader} from "three";

const colors = [
  {
    type: 'post',
    typeName: 'Постформинг',
    typeDescription: 'Технология ламинирования плит ДСП или МДФ. Скругление по передней стороне. Высокая влаго- и температуростойкость. Европейский стандарт экологичности. Материал представлен в толщинах 26мм и 38мм. Упаковка: картон и стрейч плёнка. Для защиты материала от влаги, края изделия обработаны белой технологической кромкой. При монтаже, технологическую кромку необходимо удалить и заменить на кромку в цвет изделия, либо воспользоваться торцевыми планками.',
    maxWidth: 30,
    items: [0.26, 0.38],
    variants: [
          {
            id: 'winter_berg_1',
            url: require('./img/tableTop/post/winter_berg.png'),
            name: 'Дуб вотан',
          },
          {
            id: 'winter_berg_2',
            url: require('./img/tableTop/post/winter_berg.png'),
            name: 'Ясень Анкор серый',
          }
    ]
  },
  {
    type: 'ldsp',
    typeName: 'ЛДСП',
    typeDescription: 'Ламинированная древесно - стружечная плита. Кромка 2мм на полиуретановом клее со всех сторон. Высокая влагостойкость. Качественное и экологичное покрытие. Толщина материала 22мм. Упаковка: картон и стрейч плёнка.',
    maxWidth: 27,
    items: [0.22],
    variants: [

          {
            id: 'dark_venge_2',
            url: require('./img/tableTop/ldsp/dark_venge.png'),
            name: 'Лиственница',
          },
          {
            id: 'dark_venge_2',
            url: require('./img/tableTop/ldsp/dark_venge.png'),
            name: 'Орех мраморный',
          },
        ]

  },
]

const depth = 7
// const material = new MeshStandardMaterial({color: 0x000000,});

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

  facadeMaterial.dispose()
  material.dispose()

  return facadeMaterials
}

const getMaxWidth = (type) => {
  switch (type) {
    case 'post': return 30
    case 'ldsp': return 27
  }
}

const getTableTop = ({width, height, type, url}) => {

  let tableTopBox = new BoxGeometry(width, height, depth);
  let tableTop = new Mesh(tableTopBox, getMaterial(url));

  tableTop.name = 'tableTop'

  const tableTopGroup = new Group()

  tableTopGroup.add(tableTop)

  tableTopGroup.userData.type = type
  tableTopGroup.userData.width = width
  tableTopGroup.userData.height = height
  tableTopGroup.userData.depth = depth
  tableTopGroup.userData.maxWidth = getMaxWidth(type)

  // tableTopGroup.position.set(-depth / 2, paddingBottom + height / 2, width / 2 )

  tableTopBox.dispose()

  return tableTopGroup
}

export default {
  colors,
  getTableTop,
}

