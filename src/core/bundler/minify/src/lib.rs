// Copyright © 2022 Dpm Land. All Rights Reserved.

use minifier::css::minify as mini_css;
use minifier::js::minify as mini_js;
use minifier::json::minify as mini_json;
use wasm_bindgen::prelude::*;
// Standard help
use std::str;

#[wasm_bindgen]
pub fn minify_js(content: &str) -> String {
  let minify_done = mini_js(content.into());
  minify_done.to_string()
}

#[wasm_bindgen]
pub fn minify_css(content: &str) -> String {
  let minify_done = match mini_css(content.into()) {
    Ok(v) => v,
    Err(e) => {
      panic!("DPM Minify ERROR: Can't Minify CSS\n Caused by: {}", e);
    }
  };

  minify_done.to_string()
}

#[wasm_bindgen]
pub fn minify_json(content: &str) -> String {
  let _: serde_json::Value =
    serde_json::from_str(content).unwrap_or_else(|e| {
      panic!("Json: '{}'\nError: {}", content, e);
    });

  mini_json(content.into()).to_string()
}
