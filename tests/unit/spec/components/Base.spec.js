import { expect } from "chai"
import { shallowMount } from "@vue/test-utils"

import { colors } from '@/config/teamColors'

import Base from "@/components/Base"

describe('components/Base.vue', () => {
    it('Slot(Title): Default Title', () => {
        const wrapper = shallowMount(Base)
        const defaultTitle = 'Major League Baseball'

        expect(wrapper.find('h1').text()).to.include(defaultTitle)
    })

    it('Slot(Title): Custom Title', () => {
        const title = 'Test Title'
        const wrapper = shallowMount(Base, {
            slots: {
                'page-title': title
            }
        })

        expect(wrapper.find('h1').text()).to.include(title)
    })

    it('Slot(Default): Default Content', () => {
        const wrapper = shallowMount(Base)
        const defaultContent = 'Need to Implement'

        expect(wrapper.find('v-main-stub').text()).to.include(defaultContent)
    })

    it('Slot(Default): Custom content', () => {
        const content = 'Test Content'
        const wrapper = shallowMount(Base, {
            slots: {
                'default': content 
            }
        })

        expect(wrapper.find('v-main-stub').text()).to.include(content)
    })

    it('Slot(top-right-menu): Custom Content', () => {
        const content = 'Test Content'
        const wrapper = shallowMount(Base, {
            slots: {
                'top-right-menu': content 
            }
        })

        expect(wrapper.find('v-app-bar-stub').text()).to.include(content)
    })

    it('Props(colors): Default Colors', () => {
        const wrapper = shallowMount(Base)

        expect(wrapper.find('v-app-bar-stub').attributes('style')).to.equal('background-color: ' + colors.default.primary+';')
        expect(wrapper.find('v-app-bar-nav-icon-stub').attributes('color')).to.equal(colors.default.secondary)
        expect(wrapper.find('h1').attributes('style')).to.equal('color: ' + colors.default.secondary+';')
    })

    it('Props(colors): Custom Colors', () => {
        const testColors = {
            primary: 'blue',
            secondary: 'red'
        } 

        const wrapper = shallowMount(Base, {
            propsData: {
                'colors': testColors
            }
        })

        expect(wrapper.find('v-app-bar-stub').attributes('style')).to.equal('background-color: ' + testColors.primary + ';')
        expect(wrapper.find('v-app-bar-nav-icon-stub').attributes('color')).to.equal(testColors.secondary)
        expect(wrapper.find('h1').attributes('style')).to.equal('color: ' + testColors.secondary + ';')
    })
})