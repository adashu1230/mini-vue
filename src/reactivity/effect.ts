let activeEffect;

class ReactiveEffect {
    private _fn: any;

    constructor(fn) {
        this._fn = fn
    }

    run() {
        activeEffect = this
        return this._fn()
    }
}

// 依赖收集 收集fn
const targetMaps = new Map()

export function track(target, key) {
    // target - key - dev
    let keyMap = targetMaps.get(target)
    if (!keyMap) {
        keyMap = new Map()
        targetMaps.set(target, keyMap)
    }
    let fnSet = keyMap.get(key);
    if (!fnSet) {
        fnSet = new Set()
        keyMap.set(key, fnSet)
    }
    fnSet.add(activeEffect)
}

// 触发依赖
export function trigger(target, key) {
    const targetMap = targetMaps.get(target)
    const activeEffectSets = targetMap.get(key)
    for (const activeEffect of activeEffectSets) {
        activeEffect.run()
    }
}

export function effect(fn) {
    const reactiveEffect = new ReactiveEffect(fn)
    reactiveEffect.run()
    return reactiveEffect.run.bind(reactiveEffect)//bind绑定this返回一个新函数
}
