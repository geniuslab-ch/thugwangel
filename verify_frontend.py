from playwright.sync_api import Page, expect, sync_playwright
import os
import re

def test_homepage(page: Page):
    try:
        # Go to English homepage
        page.goto("http://localhost:3000/en")

        # Verify title and content
        expect(page).to_have_title("Thugwangel")

        # Verify Navigation has Gallery
        expect(page.locator("nav").get_by_text("Gallery")).to_be_visible()

        # Verify Audio Player
        print("Checking for Audio Player...")
        expect(page.locator("audio")).to_be_attached()
        expect(page.locator("button[aria-label='Play']")).to_be_visible()

        # Check for Track Title "Cheating Cheating Lior"
        expect(page.get_by_text("Cheating Cheating Lior").first).to_be_visible()

        # Check for Playlist presence and other songs
        expect(page.get_by_text("Playlist", exact=True)).to_be_visible()
        expect(page.get_by_text("Digital Maze")).to_be_visible()
        expect(page.get_by_text("Come To Me")).to_be_visible() # Check for the last song

        # Verify YouTube iframe (updated specific ID)
        print("Checking for YouTube iframe...")
        expect(page.locator("iframe[src*='caw4j4-tW_0']")).to_be_visible(timeout=10000)

        # Verify Gallery
        print("Checking for Gallery...")
        expect(page.locator("#gallery")).to_be_visible()
        # Should have 9 images now (12 - 3 excluded)
        # Note: The carousel renders all images in the flex container
        expect(page.locator("#gallery img")).to_have_count(9)
        # Verify at least one image has the correct .png extension in its src
        # Note: Next.js Image component modifies src, but it should still contain the original filename or path
        first_gallery_img = page.locator("#gallery img").first
        expect(first_gallery_img).to_have_attribute("src", re.compile(r"gallery_01\.png"))

        # Verify images actually load (naturalWidth > 0)
        # We wait for the first image to be visible
        expect(first_gallery_img).to_be_visible()
        is_loaded = first_gallery_img.evaluate("img => img.naturalWidth > 0")
        if not is_loaded:
             raise Exception("Gallery image failed to load (naturalWidth == 0)")
        print("Gallery images are loading correctly.")

        # Verify Contact Section (Updated)
        print("Checking for Contact Section...")
        expect(page.locator("#contact")).to_be_visible()
        # expect(page.get_by_role("link", name="info@thug-angel.ch")).to_be_visible()
        expect(page.locator("a[href='mailto:info@thug-angel.ch']")).to_be_visible()
        expect(page.locator("form")).not_to_be_visible() # Ensure form is gone

        # Verify Bio Image
        print("Checking for Bio Image...")
        expect(page.locator("img[alt='Thugwangel']")).to_be_visible()

        # Screenshot English
        if not os.path.exists("verification"):
            os.makedirs("verification")
        page.screenshot(path="verification/home_v3.png", full_page=True)

        print("English page verification passed.")
    except Exception as e:
        print(f"Test failed: {e}")
        if not os.path.exists("verification"):
            os.makedirs("verification")
        page.screenshot(path="verification/debug_fail_v3.png", full_page=True)
        raise e

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_homepage(page)
            print("Verification script finished successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
            exit(1)
        finally:
            browser.close()
