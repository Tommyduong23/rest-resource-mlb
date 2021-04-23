import { expect } from "chai"
import { shallowMount } from "@vue/test-utils"

import { colors } from '@/config/teamColors'

import Base from "@/components/Base"

describe('components/Base.vue', () => {
    let shallowMountFunction

    beforeEach(() => {
        shallowMountFunction = (options = {}) => {
            return shallowMount(Base, {
                ...options,
            })
        }
    })

    it('Slot(Title): displays default title', () => {
        const defaultTitle = 'Major League Baseball'
        const componentTitle = shallowMountFunction().find('h1').text()

        expect(componentTitle).to.include(defaultTitle)
    })

    it('Slot(Title): displays custom title', () => {
        const title = 'Test Title'
        const wrapper = shallowMountFunction({
            slots: {
                'page-title': title,
            }
        })
        const componentTitle = wrapper.find('h1').text()

        expect(componentTitle).to.include(title)
    })

    it('Slot(Default): displays default content', () => {
        const defaultContent = 'Need to Implement'
        const componentContent = shallowMountFunction().find('v-main-stub').text()

        expect(componentContent).to.include(defaultContent)
    })

    it('Slot(Default): displays custom content', () => {
        const customContent = 'Test Content'
        const wrapper = shallowMountFunction({
            slots: {
                'default': customContent,
            }
        })
        const componentContent = wrapper.find('v-main-stub').text()

        expect(componentContent).to.include(customContent)
    })

    it('Slot(top-right-menu): displays custom content', () => {
        const customContent = 'Test Content'
        const wrapper = shallowMountFunction({
            slots: {
                'top-right-menu': customContent,
            }
        })
        const componentContent = wrapper.find('v-app-bar-stub').text()

        expect(componentContent).to.include(customContent)
    })

    it('Props(colors): uses default colors', () => {
        const wrapper = shallowMountFunction()
        const appBarStyle = wrapper.find('v-app-bar-stub').attributes('style')
        const appBarIconColor = wrapper.find('v-app-bar-nav-icon-stub').attributes('color')
        const titleSyle = wrapper.find('h1').attributes('style')

        expect(appBarStyle).to.equal('background-color: ' + colors.default.primary + ';')
        expect(appBarIconColor).to.equal(colors.default.secondary)
        expect(titleSyle).to.equal('color: ' + colors.default.secondary + ';')
    })

    it('Props(colors): uses custom colors', () => {
        const testColors = {
            primary: 'blue',
            secondary: 'red'
        }
        const wrapper = shallowMountFunction({
            propsData: {
                'colors': testColors
            }
        })
        const appBarStyle = wrapper.find('v-app-bar-stub').attributes('style')
        const appBarIconColor = wrapper.find('v-app-bar-nav-icon-stub').attributes('color')
        const titleSyle = wrapper.find('h1').attributes('style')

        expect(appBarStyle).to.equal('background-color: ' + testColors.primary + ';')
        expect(appBarIconColor).to.equal(testColors.secondary)
        expect(titleSyle).to.equal('color: ' + testColors.secondary + ';')
    })
})
