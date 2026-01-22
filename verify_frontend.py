from playwright.sync_api import Page, expect, sync_playwright
import os

def test_homepage(page: Page):
    try:
        # Go to English homepage
        page.goto("http://localhost:3000/en")

        # Verify title and content
        expect(page).to_have_title("Thugwangel")

        # Verify Audio Player
        print("Checking for Audio Player...")
        # Check for the audio element
        expect(page.locator("audio")).to_be_attached()

        # Check for Play button (using the aria-label I added)
        play_button = page.locator("button[aria-label='Play']")
        expect(play_button).to_be_visible()

        # Check for Track Title - Using first() to handle duplicates (Main player + Playlist)
        expect(page.get_by_text("Demo Track 1").first).to_be_visible()

        # Check for Playlist
        expect(page.get_by_text("Playlist", exact=True)).to_be_visible()
        expect(page.get_by_text("Demo Track 2")).to_be_visible()

        # Verify YouTube iframe (should still be there)
        print("Checking for YouTube iframe...")
        expect(page.locator("iframe[src*='youtube.com']").first).to_be_visible(timeout=10000)

        # Verify Bio Image (should still be there)
        print("Checking for Bio Image...")
        expect(page.locator("img[alt='Thugwangel']")).to_be_visible()

        # Screenshot English
        if not os.path.exists("verification"):
            os.makedirs("verification")
        page.screenshot(path="verification/home_player_en.png", full_page=True)

        print("English page verification with player passed.")
    except Exception as e:
        print(f"Test failed: {e}")
        page.screenshot(path="verification/debug_player_fail.png", full_page=True)
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
