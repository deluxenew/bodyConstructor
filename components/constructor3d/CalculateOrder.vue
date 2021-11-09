<template lang="pug">
    div.calc-form
      .calc-form__inner
        .calc-form__title Расчет стоимости заказа
        .calc-form__subtitle(v-if="cases.length") Корпуса
        .calc-form__table(v-if="cases.length")
          .calc-form__row.calc-form__row_header
            .calc-form__col.calc-form__col_number №
            .calc-form__col.calc-form__col_name Форма
            .calc-form__col Материал
            .calc-form__col Размер
            .calc-form__col Цвет
            .calc-form__col Кол-во
            .calc-form__col Цена, шт
            .calc-form__col.calc-form__col_button
          .calc-form__row(v-for="(item, index) in cases" :key="item.uuid")
            .calc-form__col.calc-form__col_number {{index + 1}}
            .calc-form__col.calc-form__col_name {{item.form}}
            .calc-form__col {{item.material}}
            .calc-form__col {{item.size}}
            .calc-form__col {{item.color}}
            .calc-form__col {{item.value}}
            .calc-form__col {{item.price }}
            .calc-form__col.calc-form__col_button
              img.delete(:src="require('./img/delete.svg')" @click="removeItem({uuid: item.uuid, type: 'cases'})")

        .calc-form__subtitle(v-if="facades.length") Фасады
        .calc-form__table(v-if="facades.length")
          .calc-form__row.calc-form__row_header
            .calc-form__col.calc-form__col_number №
            .calc-form__col.calc-form__col_name Форма
            .calc-form__col Материал
            .calc-form__col Размер
            .calc-form__col Цвет
            .calc-form__col Кол-во
            .calc-form__col Цена, шт
            .calc-form__col.calc-form__col_button
          .calc-form__row(v-for="(item, index) in facades" :key="item.uuid")
            .calc-form__col.calc-form__col_number {{index + 1}}
            .calc-form__col.calc-form__col_name {{item.form}}
            .calc-form__col {{item.material}}
            .calc-form__col {{item.size}}
            .calc-form__col {{item.color}}
            .calc-form__col {{item.value}}
            .calc-form__col {{item.price}}
            .calc-form__col.calc-form__col_button
              img.delete(:src="require('./img/delete.svg')" @click="removeItem({uuid: item.uuid, type: 'facades'})")

        .calc-form__subtitle(v-if="tableTops.length") Столешницы
        .calc-form__table(v-if="tableTops.length")
          .calc-form__row.calc-form__row_header
            .calc-form__col.calc-form__col_number №
            .calc-form__col.calc-form__col_name Форма
            .calc-form__col Материал
            .calc-form__col Размер
            .calc-form__col Цвет
            .calc-form__col Кол-во
            .calc-form__col Цена, шт
            .calc-form__col.calc-form__col_button
          .calc-form__row(v-for="(item, index) in tableTops" :key="item.uuid")
            .calc-form__col.calc-form__col_number {{index + 1}}
            .calc-form__col.calc-form__col_name {{item.form}}
            .calc-form__col {{item.material}}
            .calc-form__col {{item.size}}
            .calc-form__col {{item.color}}
            .calc-form__col {{item.value}}
            .calc-form__col {{item.price}}
            .calc-form__col.calc-form__col_button
              img.delete(:src="require('./img/delete.svg')" @click="removeItem({uuid: item.uuid, type: 'tableTops'})")
</template>

<script>
  export default {
    name: "CalculateOrder",
    props: {
      kitchen: {
        type: Object,
        default: () => ({
          currentConfig: null,
          order: {
            cases: [],
            facades: [],
            tableTops: []
          }
        })
      }
    },
    computed: {
      cases() {
        return this.kitchen?.order?.cases || []
      },
      facades() {
        return this.kitchen?.order?.facades || []
      },
      tableTops() {
        return this.kitchen?.order?.tableTops || []
      }

    },
    methods: {
      removeItem(uuid) {
        this.$emit('removeItem', uuid)
      }
    }
  }
</script>

<style lang="scss" scoped>
.calc-form {
  border: 1px solid #C7CAD1;
  border-radius: 4px;
  background: #FFFFFF;
  padding: 32px 42px;

  &__inner, &__table  {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
  }

  &__title {
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0.32px;
    color: #23252A;
  }

  &__subtitle {
    padding-top: 16px;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.32px;
    color: #23252A;
  }

  &__table {
    padding-top: 8px;
  }

  &__row {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    padding: 8px 0;

    &_header {
      .calc-form__col {
        color: #9DA2AE;
      }
    }

  }

  &__col {
    flex: 0 0 152px;
    display: flex;
    align-items: center;
    line-height: 20px;
    font-size: 14px;
    justify-content: flex-start;
    color: #23252A;

    &_number {
      flex: 0 0 64px;
      color: #9DA2AE;
    }

    &_name {
      flex: 1 1 100%;
    }

    &_button {
      flex: 0 0 24px;
      justify-content: center;

      .delete {
        cursor: pointer;
        border-radius: 50%;
        transition: .2s ease-in-out;

        &:hover {
          transform: scale(1.2)
        }
      }
    }
  }


}
</style>
