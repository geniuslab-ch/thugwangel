from playwright.sync_api import Page, expect, sync_playwright
import os

def test_homepage(page: Page):
    # Go to English homepage
    page.goto("http://localhost:3000/en")

    # Verify title and content
    expect(page).to_have_title("Thugwangel")
    expect(page.get_by_text("International Rap Artist based in Switzerland")).to_be_visible()

    # Screenshot English
    if not os.path.exists("verification"):
        os.makedirs("verification")
    page.screenshot(path="verification/home_en.png", full_page=True)

    # Go to French homepage
    page.goto("http://localhost:3000/fr")

    # Verify content in French
    expect(page.get_by_text("Artiste Rap International basé en Suisse")).to_be_visible()

    # Screenshot French
    page.screenshot(path="verification/home_fr.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_homepage(page)
            print("Verification script finished successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
