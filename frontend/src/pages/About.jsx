import React from "react";

function About() {
  return (
    <div>
      <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content text-center">
          <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
            <h1 class="text-6xl font-bold">About This Tool</h1>
            <p class="pt-6">
              <span className="font-bold text-yellow-400">Purpose: </span>
              The eligibility tool aims to simplify access to energy-saving
              programs and tax rebates for Virginia residents. Its mission is to
              make energy efficiency and sustainability initiatives more
              accessible, empowering you to take advantage of available
              incentives. By integrating friendly features and clear guidance,
              the tool supports our broader vision of building a more
              energy-efficient and resilient community.
            </p>
            <p class="text-right text-xl font-bold text-yellow-400">- LEAP</p>
          </div>
        </div>
      </div>

      <div class="hero bg-base-200">
        <div class="hero-content text-center">
          <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
            <h1 class="pb-3 text-6xl font-bold">How to Use</h1>
            <h1 class="text-3xl font-bold">Step 1</h1>
            <p class="py-1">
              <span className="font-bold text-yellow-400">Purpose: </span>
              The eligibility tool aims to simplify access to energy-saving
              programs and tax rebates for Virginia residents by providing
              personalized recommendations based on user input, such as location
              and household details. Its mission is to make energy efficiency
              and sustainability initiatives more accessible,
            </p>
          </div>
        </div>
      </div>

      <div class="hero bg-base-200">
        <div class="hero-content text-center">
          <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
            <h1 class="text-3xl font-bold">Step 2</h1>
            <p class="py-1">
              <span className="font-bold text-yellow-400">Purpose: </span>
              The eligibility tool aims to simplify access to energy-saving
              programs and tax rebates for Virginia residents by providing
              personalized recommendations based on user input, such as location
              and household details. Its mission is to make energy efficiency
              and sustainability initiatives more accessible,
            </p>
          </div>
        </div>
      </div>

      <div class="hero bg-base-200">
        <div class="hero-content text-center">
          <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
            <h1 class="text-3xl font-bold">Step 3</h1>
            <p class="py-1">
              <span className="font-bold text-yellow-400">Purpose: </span>
              The eligibility tool aims to simplify access to energy-saving
              programs and tax rebates for Virginia residents by providing
              personalized recommendations based on user input, such as location
              and household details. Its mission is to make energy efficiency
              and sustainability initiatives more accessible,
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center text-center justify-center min-h-screen bg-base-200 py-5">
        <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
          <h1 class="pb-3 text-6xl font-bold">FAQ</h1>

          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div class="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div class="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div class="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div class="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
