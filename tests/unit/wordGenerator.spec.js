import { shallowMount } from '@vue/test-utils'
import WordGenerator from '@/components/WordGenerator'

/**
 * Test 1 - Mounting the Number converter component
 */
describe('Mount Component', () => {
  const wrapper = shallowMount(WordGenerator);
  test('does wrapper exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
})

/**
 * Test 2 - Validation method check
 */
describe('validateWord function test',() => {
  const wrapper = shallowMount(WordGenerator)

  it("null check", async () =>{
    await wrapper.setData({wordCheck: "",spellResults:""})
    wrapper.vm.validateWord();
    expect(wrapper.vm.spellResults).toContain("Please Enter the word")
  })
})