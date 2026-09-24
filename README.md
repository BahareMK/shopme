# Shopme

A static, front-end-only e-commerce demo styled after amazon.com's look and feel.

**No backend, no build step, no tests** — just plain HTML, CSS, and vanilla
JavaScript. Product data lives in `js/products.js` and the shopping cart is
kept in the browser's `localStorage`.

## Pages

- `index.html` — homepage: hero banner, category promo cards, "Today's
  Deals" strip, and product grids by category.
- `product.html?id=<id>` — product detail page with quantity picker,
  "Add to Cart" / "Buy Now", and related products.
- `cart.html` — shopping cart: update quantities, remove items, and a demo
  "Proceed to Checkout" flow that shows an order-confirmation modal and
  clears the cart (no real payment or order is ever created).

## Functionality

- **Search** — the search bar in the header works from any page. Results
  render on the homepage, filterable by keyword and/or category, and update
  live as you type.
- **Buy products** — "Add to Cart" and "Buy Now" buttons on product cards
  and the product page add items to a cart stored in `localStorage`; the
  cart page lets you adjust quantities and "check out" (demo only).

## Running it

No server required — just open `index.html` in a browser. If your browser
restricts `localStorage` for `file://` pages, serve the folder instead:

```
cd shopme
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying to S3 (CloudFormation)

[template.yaml](template.yaml) provisions an S3 bucket with the static
website feature enabled and a public-read bucket policy. CloudFormation only
provisions the bucket — it doesn't upload files — so sync the site content
as a second step.

1. Create the stack (bucket name must be globally unique):

```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name shopme-site \
  --parameter-overrides BucketName=my-unique-shopme-bucket
```

2. Upload the site (HTML, CSS, JS):

```bash
aws s3 sync . s3://my-unique-shopme-bucket \
  --exclude "template.yaml" --exclude "README.md" --exclude ".DS_Store" --exclude ".git/*"
```

3. Get the website URL:

```bash
aws cloudformation describe-stacks \
  --stack-name shopme-site \
  --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" \
  --output text
```

Note: Shopme has no dedicated error page, so the template's `ErrorDocument`
defaults to `index.html`. The S3 website endpoint is HTTP-only; add
CloudFront in front of the bucket if you need HTTPS or a custom domain.

### Teardown

The bucket has `DeletionPolicy: Retain`, so deleting the stack won't delete
the bucket. To fully clean up:

```bash
aws s3 rm s3://my-unique-shopme-bucket --recursive
aws cloudformation delete-stack --stack-name shopme-site
aws s3 rb s3://my-unique-shopme-bucket
```
