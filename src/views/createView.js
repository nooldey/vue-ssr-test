import Item from './item.vue'
/**
 * 工厂函数
 * @description 动态构建视图
 * 
 */
export default function createView (type) {
    return {
        name: type,
        asyncData({store}) {
            return store.dispatch('fetch_list_data',{type})
        },
        render (h) {
            return h(Item, { props: { type } })
        }
    }
}