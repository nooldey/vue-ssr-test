import Item from './item.vue'
/**
 * 工厂函数
 * @description 动态构建视图
 * 
 */
export default function createView (type) {
    return {
        name: `${type}-view`,
        asyncData({store}) {
            return store.dispatch(`fetch_${type}`)
        },
        render (h) {
            return h(Item,{props:{type}})
        }
    }
}