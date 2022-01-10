const eventBus = () => {
    const subs = new Map();
    return {
        subs,
        /**
         * 注册事件
         * @param {string} type 事件类型
         * @param {Function} callback 回调函数
         */
        $on(type, callback) {
            const sub = subs.get(type);
            const isEmpty = sub && sub.push(callback);
            if (!isEmpty) {
                subs.set(type, [callback]);
            }
        },
        /**
         * 触发事件
         * @param {string} type 
         * @param  {Any} payload 
         */
        $emit(type, ...payload) {
            (subs.get(type) || []).forEach(fn => {
                fn(...payload)
            });
            (subs.get('*') || []).forEach(fn => {
                fn(...payload)
            }); /* 所有事件类型都执行 */
        },
        /**
         * 注销事件
         * @param {string} type 
         * @param {function} callback 
         */
        $off(type, callback) {
            const sub = subs.get(type);
            if (sub) {
                sub.splice(sub.indexOf(callback) >>> 0, 1);
            }
        }
    }
}
module.exports = eventBus;