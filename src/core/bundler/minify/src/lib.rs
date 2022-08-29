use css_minify::optimizations::{Level, Minifier};
use minify::json;
use minify_html::{minify as mini_html, Cfg};
use minify_js::minify as mini_js;
use wasm_bindgen::prelude::*;
// Standard help
use std::str;

#[wasm_bindgen]
pub fn minify_js(content: &str) -> String {
  let mut out = Vec::new();
  mini_js(content.as_bytes().to_vec(), &mut out).unwrap();

  let minify_done = match str::from_utf8(&out) {
    Ok(v) => v,
    Err(e) => {
      panic!(
        "DPM Minify ERROR: Cannot transform from Vec to String\nCaused by: {}",
        e
      );
    }
  };

  minify_done.to_string()
}

#[wasm_bindgen]
pub fn minify_html(content: &str) -> String {
  let mut cfg = Cfg::new();
  cfg.keep_comments = true;
  cfg.minify_js = true;
  cfg.minify_css = true;

  let out = mini_html(content.as_bytes(), &cfg);

  let minify_done = match str::from_utf8(&out) {
    Ok(v) => v,
    Err(e) => {
      panic!(
        "DPM Minify ERROR: Cannot transform from Vec to String\nCaused by: {}",
        e
      );
    }
  };

  minify_done.to_string()
}

#[wasm_bindgen]
pub fn minify_css(content: &str) -> String {
  let mut minifier = Minifier::default();

  let minify_done = match minifier.minify(content, Level::Two) {
    Ok(v) => v,
    Err(e) => {
      panic!("DPM Minify ERROR: Cannot minify the css\nCaused by: {}", e);
    }
  };
  minify_done
}

#[wasm_bindgen]
pub fn minify_json(content: &str) -> String {
  let _: serde_json::Value =
    serde_json::from_str(content).unwrap_or_else(|e| {
      panic!("Json: '{}'\nError: {}", content, e);
    });

  json::minify(content)
}
