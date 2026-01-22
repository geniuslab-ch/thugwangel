from playwright.sync_api import Page, expect, sync_playwright
import os

def test_homepage(page: Page):
    try:
        # Go to English homepage
        page.goto("http://localhost:3000/en")

        # Verify title and content
        expect(page).to_have_title("Thugwangel")

        # Verify Media Elements
        # Check for Apple Music iframe
        print("Checking for Apple Music iframe...")
        expect(page.locator("iframe[src*='music.apple.com']").first).to_be_visible(timeout=10000)

        # Check for YouTube iframe
        print("Checking for YouTube iframe...")
        expect(page.locator("iframe[src*='youtube.com']").first).to_be_visible(timeout=10000)

        # Check for Bio Image
        print("Checking for Bio Image...")
        expect(page.locator("img[alt='Thugwangel']")).to_be_visible()

        # Screenshot English
        if not os.path.exists("verification"):
            os.makedirs("verification")
        page.screenshot(path="verification/home_media_en.png", full_page=True)

        print("English page verification with media passed.")
    except Exception as e:
        print(f"Test failed: {e}")
        page.screenshot(path="verification/debug_fail.png", full_page=True)
        # print(page.content()) # Too large to print
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
