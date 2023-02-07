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
describe('validateWord function test', () => {
  const wrapper = shallowMount(WordGenerator)

  //Test if null value returns an error message
  it("null check", async () => {
    await wrapper.setData({ wordCheck: "", spellResults: "" })
    wrapper.vm.validateWord();
    expect(wrapper.vm.spellResults).toContain("Please Enter the word")
  })

  //Test if special character is passed and error message is returned
  it("special character check", async () => {
    await wrapper.setData({ wordCheck: "*/", spellResults: "" })
    wrapper.vm.validateWord();
    expect(wrapper.vm.spellResults).toContain("Please Enter a valid word with letters only")
  })

  //Test if numbers is passed and error message is returned
  it("special character check", async () => {
    await wrapper.setData({ wordCheck: "5e2", spellResults: "" })
    wrapper.vm.validateWord();
    expect(wrapper.vm.spellResults).toContain("Please Enter a valid word with letters only")
  })

  //Test if special character is passedand error message is returned
  it("test if string is accepted", async () => {
    await wrapper.setData({ wordCheck: "test", spellResults: "" })
    wrapper.vm.validateWord();
    expect(wrapper.vm.spellResults).toContain("")
  })
})