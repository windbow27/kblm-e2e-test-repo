import { test, expect, Page } from "@playwright/test";

const testForArcanistPlanning = (
  ...arcanists: {
    name: string
    insight: [number, number]
    level: [number, number]
    resonance: [number, number]
    expectMaterials: {
      name: string
      count: string
    }[]
  }[]
) => {
  return async ({ page }: { page: Page }) => {
    const setupStatus = async (blockName: string, status: [string, string]) => {
      if (status.length !== 2) { return }

      const settingBlock = page.locator('.edit-overlay')
        .locator(`:below(:text("${blockName}"))`)
        .first()

      for (let i = 0; i < status.length; i++) {
        await settingBlock.getByRole('button').nth(i).click()
        const fromBlock = settingBlock.locator('div:below(button)')
          .filter({ has: page.getByRole('button') })
          .first()
        await fromBlock.getByRole('button', { name: status[i], exact: true }).click()
      }
    }

    for (let i = 0; i < arcanists.length; i++) {
      const arcanist = arcanists[i]
      await page.getByRole("button", { name: "Add Arcanist" }).click()
      await page.getByLabel('Show Unreleased Arcanists').check()
      await page.getByText(arcanist.name).click()

      await setupStatus('CURRENT LEVEL', [
        arcanist.insight[0] ? `Option ${arcanist.insight[0]}` : '', `${arcanist.level[0]}`
      ])
      await setupStatus('GOAL LEVEL', [
        arcanist.insight[1] ? `Option ${arcanist.insight[1]}` : '', `${arcanist.level[1]}`
      ])
      await setupStatus('RESONANCE', arcanist.resonance.map(item => `${item}`) as [string, string])


      const materialsBlock = page.locator('div:below(button:text("Save"))')
        .filter({ has: page.getByRole('img') })
        .first()
      await Promise.all(
        arcanist.expectMaterials.map(material => expect(
          materialsBlock.locator(`[data-tip="${material.name}"]`).getByText(material.count)
        ).toBeVisible())
      )

      await page.getByRole('button', { name: 'Save' }).click()
    }

    await expect(page).toHaveScreenshot();
  }
}

// test.describe("Arcanist planning", () => {
test.beforeEach(({ page }) => {
  page.goto("/Kornblume/planner")
})

test(
  "Should correctly plan several arcanists",
  testForArcanistPlanning(
    {
      name: 'Regulus',
      insight: [1, 3],
      level: [1, 30],
      resonance: [1, 10],
      expectMaterials: [
        { name: 'Dust', count: '751k' },
        { name: 'Sharpodonty', count: '579k' },
        { name: 'Hypocritical Murmur', count: '1' },
        { name: 'Sonorous Knell', count: '5' },
        { name: 'Brief Cacophony', count: '30' },
        { name: 'Moment of Dissonance', count: '15' },
        { name: 'Mistilteinn', count: '3' },
        { name: 'Tome of Starlit Ascent', count: '16' },
        { name: 'Platinum Ouija', count: '5' },
        { name: 'Scroll of Starlit Ascent', count: '10' },
        { name: 'Clawed Pendulum', count: '3' },
        { name: 'Prophetic Bird', count: '5' },
        { name: 'Holy Silver', count: '6' },
        { name: 'Bifurcated Skeleton', count: '5' },
        { name: 'Salted Mandrake', count: '4' },
        { name: 'Biting Box', count: '10' },
        { name: 'Solidus', count: '3' },
        { name: 'Rough Silver Ingot', count: '8' },
        { name: 'Esoteric Bones', count: '4' },
        { name: 'Milled Magnesia', count: '9' },
        { name: 'Silver Ore', count: '4' },
        { name: 'Trembling Tooth', count: '4' }
      ]
    },
    {
      name: 'Jiu Niangzi',
      insight: [0, 3],
      level: [1, 60],
      resonance: [0, 15],
      expectMaterials: [
        { name: 'Dust', count: '1.3m' },
        { name: 'Sharpodonty', count: '1.0m' },
        { name: 'Sinuous Howl', count: '6' },
        { name: 'Sonorous Knell', count: '38' },
        { name: 'Brief Cacophony', count: '30' },
        { name: 'Moment of Dissonance', count: '15' },
        { name: 'Mistilteinn', count: '3' },
        { name: 'Fruit of Good and Evil', count: '3' },
        { name: 'Caduceus', count: '2' },
        { name: 'Tome of Mineral Wealth', count: '16' },
        { name: 'Platinum Ouija', count: '4' },
        { name: 'Murmur of Insanity', count: '5' },
        { name: 'Wyrmling Skeleton', count: '10' },
        { name: 'Bogeyman', count: '4' },
        { name: 'Wheel and Axle Core', count: '4' },
        { name: 'Scroll of Mineral Wealth', count: '10' },
        { name: 'Clawed Pendulum', count: '3' },
        { name: 'Holy Silver', count: '9' },
        { name: 'Bifurcated Skeleton', count: '5' },
        { name: 'Biting Box', count: '11' },
        { name: 'Winged Key', count: '11' },
        { name: 'Curved Goose Neck', count: '5' },
        { name: 'Page of Mineral Wealth', count: '6' },
        { name: 'Solidus', count: '3' },
        { name: 'Spell of Fortune', count: '10' },
        { name: 'Milled Magnesia', count: '10' },
        { name: 'Liquefied Terror', count: '3' },
        { name: 'Ceaseless Wheel', count: '5' },
        { name: 'Spell of Banishing', count: '6' },
        { name: 'Shattered Bones', count: '4' },
        { name: 'Magnesia Crystal', count: '4' }
      ]
    }
  )
)
// })