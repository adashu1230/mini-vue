import { reactive} from "../reactive";
import {effect} from '../effect'
describe('effect',()=>{
  it('happy path',()=>{
    const user = reactive({
      age:20
    })

    let nextAge;
    effect(()=>{
      nextAge = user.age+1
    })

    expect(nextAge).toBe(21)
    user.age++
    expect(nextAge).toBe(22)
  })



  it('should be return function',()=>{
    let age = 20
    const runner = effect(()=>{
      age++
      return 'foo'
    })
    expect(age).toBe(21)
    const str = runner()
    expect(age).toBe(22)
    expect(str).toBe('foo')
  })


})




