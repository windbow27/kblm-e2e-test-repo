import { test, expect } from "@playwright/test";
import path from "path";

function testForImageTracker(
  images: string[],
  expectedResult: { pull: string; name: string; time: string }[]
) {
  return async ({ page }) => {
    await test.step("Navigate to tracker", async () => {
      // Please run the Kornblume local server first if you want to run tests in local environment
      // await page.goto("/tracker?debug=1");
      await page.goto("/Kornblume/tracker?debug=1"); // this is the correct link right?
    });

    await test.step("Close the tutorial", async () => {
      await page
        .locator("#tutorial")
        .getByRole("button", { name: "✕" })
        .click({ force: true });
    });

    await test.step("Import OCR images", async () => {
      // click import button
      const fileChooserPromise = page.waitForEvent("filechooser");
      await page
        .getByRole("button", { name: "Import Images" })
        .click({ force: true });

      // choose images
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        images.map((img) => path.join(__dirname, `/images/${img}`)),
        { force: true }
      );

      // wait for OCR processing
      const processing = await page.getByText("Processing file");
      await expect(processing).toBeHidden({ timeout: 3 * 60 * 1000 });
    });

    await test.step("Set up filters for rarity", async () => {
      await page
        .getByRole("button", { name: "" })
        .nth(0)
        .click({ force: true });
      await page
        .getByRole("button", { name: "" })
        .nth(1)
        .click({ force: true });
      await page
        .getByRole("button", { name: "" })
        .nth(2)
        .click({ force: true });
      await page
        .getByRole("button", { name: "" })
        .nth(3)
        .click({ force: true });
    });

    await test.step("Verify if the results align with expectations", async () => {
      for (const result of expectedResult) {
        const row = page
          .getByRole("row")
          .filter({ has: page.getByText(result.pull, { exact: true }) })
        await expect(row).toContainText(result.name);
        await expect(row).toContainText(result.time);
      }
    });
  };
}

test(
  "Should correctly read iPhone screenshot",
  testForImageTracker(
    ["test1/01.png"],
    [
      { pull: "1", name: "Horropedia", time: "28/12/2023 05:06:20" },
      { pull: "2", name: "Erick", time: "28/12/2023 05:06:20" },
      { pull: "3", name: "Jessica", time: "28/12/2023 05:06:20" },
      { pull: "4", name: "Nick Bottom", time: "28/12/2023 05:06:20" },
      { pull: "5", name: "Horropedia", time: "28/12/2023 05:06:20" },
      { pull: "6", name: "The Fool", time: "28/12/2023 05:06:20" },
      { pull: "7", name: "ONiON", time: "28/12/2023 05:06:20" },
      { pull: "8", name: "Mesmer Jr.", time: "28/12/2023 05:06:20" },
      { pull: "9", name: "The Fool", time: "28/12/2023 05:06:20" },
      { pull: "10", name: "Door", time: "28/12/2023 05:06:20" },
    ]
  )
);

test(
  "Should correctly read Windows screenshot",
  testForImageTracker(
    ["test2/01.png"],
    [
      { pull: "1", name: "John Titor", time: "07/12/2023 12:21:31" },
      { pull: "2", name: "La Source", time: "07/12/2023 12:21:31" },
      { pull: "3", name: "Sputnik", time: "07/12/2023 12:21:31" },
      { pull: "4", name: "Tooth Fairy", time: "07/12/2023 12:21:31" },
      { pull: "5", name: "Mesmer Jr.", time: "07/12/2023 12:21:31" },
      { pull: "6", name: "Necrologist", time: "07/12/2023 12:21:31" },
      { pull: "7", name: "Satsuki", time: "07/12/2023 12:21:31" },
      { pull: "8", name: "Leilani", time: "07/12/2023 12:21:31" },
      { pull: "9", name: "Nick Bottom", time: "07/12/2023 12:21:31" },
      { pull: "10", name: "Oliver Fog", time: "07/12/2023 12:21:31" },
    ]
  )
);

test(
  "Should correctly read multiple images uploaded at once",
  testForImageTracker(
    ["test3/01.png", "test3/02.png"],
    [
      { pull: "1", name: "Erick", time: "07/12/2023 10:08:56" },
      { pull: "2", name: "La Source", time: "07/12/2023 10:09:07" },
      { pull: "3", name: "Satsuki", time: "07/12/2023 10:09:23" },
      { pull: "4", name: "Sputnik", time: "07/12/2023 10:09:42" },
      { pull: "5", name: "aliEn T", time: "07/12/2023 10:09:52" },
      { pull: "6", name: "Cristallo", time: "07/12/2023 10:10:01" },
      { pull: "7", name: "Twins Sleep", time: "07/12/2023 10:10:01" },
      { pull: "8", name: "Sputnik", time: "07/12/2023 10:10:01" },
      { pull: "9", name: "John Titor", time: "07/12/2023 10:10:01" },
      { pull: "10", name: "Darley Clatter", time: "07/12/2023 10:10:01" },
      { pull: "11", name: "ONiON", time: "07/12/2023 10:10:01" },
      { pull: "12", name: "Ms. Radio", time: "07/12/2023 10:10:01" },
      { pull: "13", name: "Ms. Moissan", time: "07/12/2023 10:10:01" },
      { pull: "14", name: "Erick", time: "07/12/2023 10:10:01" },
      { pull: "15", name: "Bunny Bunny", time: "07/12/2023 10:10:01" },
      { pull: "16", name: "aliEn T", time: "07/12/2023 10:11:01" },
      { pull: "17", name: "Bunny Bunny", time: "07/12/2023 10:11:26" },
      { pull: "18", name: "TTT", time: "07/12/2023 10:11:32" },
      { pull: "19", name: "Pavia", time: "07/12/2023 10:11:38" },
      { pull: "20", name: "Tooth Fairy", time: "07/12/2023 10:11:42" },
    ]
  )
);

test(
  "Should correctly read images that screenshotted at different moments",
  testForImageTracker(
    ["test4/00.png", "test3/01.png", "test3/02.png"],
    [
      { pull: "1", name: "Erick", time: "07/12/2023 10:08:56" },
      { pull: "2", name: "La Source", time: "07/12/2023 10:09:07" },
      { pull: "3", name: "Satsuki", time: "07/12/2023 10:09:23" },
      { pull: "4", name: "Sputnik", time: "07/12/2023 10:09:42" },
      { pull: "5", name: "aliEn T", time: "07/12/2023 10:09:52" },
      { pull: "6", name: "Cristallo", time: "07/12/2023 10:10:01" },
      { pull: "7", name: "Twins Sleep", time: "07/12/2023 10:10:01" },
      { pull: "8", name: "Sputnik", time: "07/12/2023 10:10:01" },
      { pull: "9", name: "John Titor", time: "07/12/2023 10:10:01" },
      { pull: "10", name: "Darley Clatter", time: "07/12/2023 10:10:01" },
      { pull: "11", name: "ONiON", time: "07/12/2023 10:10:01" },
      { pull: "12", name: "Ms. Radio", time: "07/12/2023 10:10" },
      { pull: "13", name: "Ms. Moissan", time: "07/12/2023 10:10:01" },
      { pull: "14", name: "Erick", time: "07/12/2023 10:10:01" },
      { pull: "15", name: "Bunny Bunny", time: "07/12/2023 10:10:01" },
      { pull: "16", name: "aliEn T", time: "07/12/2023 10:11:01" },
      { pull: "17", name: "Bunny Bunny", time: "07/12/2023 10:11:26" },
      { pull: "18", name: "TTT", time: "07/12/2023 10:11:32" },
      { pull: "19", name: "Pavia", time: "07/12/2023 10:11:38" },
      { pull: "20", name: "Tooth Fairy", time: "07/12/2023 10:11:42" },
      { pull: "21", name: "Oliver Fog", time: "28/12/2023 05:03:50" },
    ]
  )
);

test(
  "Should correctly read triple Poltergeist",
  testForImageTracker(
    ["test5/01.png"],
    [
      { pull: "1", name: "APPLe", time: "07/12/2023 23:23:50" },
      { pull: "2", name: "Sputnik", time: "07/12/2023 23:23:50" },
      { pull: "3", name: "La Source", time: "07/12/2023 23:23:50" },
      { pull: "4", name: "ONiON", time: "07/12/2023 23:23:50" },
      { pull: "5", name: "Rabies", time: "07/12/2023 23:23:50" },
      { pull: "6", name: "La Source", time: "07/12/2023 23:23:50" },
      { pull: "7", name: "Poltergeist", time: "07/12/2023 23:23:50" },
      { pull: "8", name: "Poltergeist", time: "07/12/2023 23:23:50" },
      { pull: "9", name: "Poltergeist", time: "07/12/2023 23:23:50" },
      { pull: "10", name: "John Titor", time: "07/12/2023 23:23:50" },
    ]
  )
);

test(
  "Should correctly read Click",
  testForImageTracker(
    ["test6/01.png"],
    [
      { pull: "1", name: "TTT", time: "18/01/2024 10:08:24" },
      { pull: "2", name: "Click", time: "18/01/2024 10:08:24" },
      { pull: "3", name: "Eagle", time: "18/01/2024 10:08:24" },
      { pull: "4", name: "Nick Bottom", time: "18/01/2024 10:08:24" },
      { pull: "5", name: "Leilani", time: "18/01/2024 10:08:24" },
      { pull: "6", name: "Rabies", time: "18/01/2024 12:40:26" },
      { pull: "7", name: "Erick", time: "18/01/2024 12:40:26" },
      { pull: "8", name: "Sputnik", time: "18/01/2024 12:40:26" },
      { pull: "9", name: "Mesmer Jr.", time: "18/01/2024 12:40:26" },
      { pull: "10", name: "Bette", time: "18/01/2024 12:40:26" },
    ]
  )
);

test(
  "Should not read the year into 2025",
  testForImageTracker(
    ["test6/01.png"],
    [
      { pull: "1", name: "Kanjira", time: "18/01/2024 11:51:17" },
      { pull: "2", name: "Oliver Fog", time: "18/01/2024 11:51:17" },
      { pull: "3", name: "Poltergeist", time: "18/01/2024 11:51:17" },
      { pull: "4", name: "Sputnik", time: "18/01/2024 11:51:17" },
      { pull: "5", name: "Door", time: "18/01/2024 11:51:17" },
      { pull: "6", name: "Ms. Radio", time: "18/01/2024 11:51:17" },
      { pull: "7", name: "Necrologist", time: "18/01/2024 11:51:17" },
      { pull: "8", name: "Poltergeist", time: "18/01/2024 11:51:17" },
      { pull: "9", name: "Bette", time: "18/01/2024 11:51:17" },
      { pull: "10", name: "ONiON", time: "21/01/2024 08:48:53" },
    ]
  )
);
