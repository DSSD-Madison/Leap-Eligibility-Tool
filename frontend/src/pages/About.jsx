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
            <p class="py-1 text-xl">
              <span className="font-bold text-blue-400">Select </span>
              your county from the interactive map, or type it in our search
              bar.
            </p>
          </div>
        </div>
      </div>

      <div class="hero bg-base-200">
        <div class="hero-content text-center">
          <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
            <h1 class="text-3xl font-bold">Step 2</h1>
            <p class="py-1 text-xl">
              <span className="font-bold text-green-400">Answer </span>
              our basic questions. These will give us a better understanding of
              what programs may suit you.
            </p>
          </div>
        </div>
      </div>

      <div class="hero bg-base-200">
        <div class="hero-content text-center">
          <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
            <h1 class="text-3xl font-bold">Step 3</h1>
            <p class="py-1 text-xl">
              <span className="font-bold text-red-400">Explore </span>
              the programs you find. Their websites will be linked!
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
              What is the purpose of the eligibility tool?
            </div>
            <div class="collapse-content">
              <p>
                The tool helps Virginia residents identify energy-saving
                programs and tax rebates they may qualify for based on their
                location, household details, and other eligibility criteria.
              </p>
            </div>
          </div>
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">
              How does the tool determine my eligibility for programs?
            </div>
            <div class="collapse-content">
              <p>
                The tool uses the information you provide, such as income level,
                household size, and location, to evaluate your eligibility based
                on pre-defined criteria from LEAP's resources.
              </p>
            </div>
          </div>
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">
              Is my personal information safe when using this tool?
            </div>
            <div class="collapse-content">
              <p>
                Yes, the tool is designed with strict privacy and security
                protocols to ensure your data is protected and handled securely.
              </p>
            </div>
          </div>
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">
              Can I use this tool if I am a small business owner?
            </div>
            <div class="collapse-content">
              <p>
                Yes, the tool includes options to evaluate incentives and
                programs for small business owners alongside residential
                benefits.
              </p>
            </div>
          </div>
          <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">
              Does this tool cost anything to use?
            </div>
            <div class="collapse-content">
              <p>
                No, the eligibility tool is free to use as part of LEAP's
                mission to make energy efficiency more accessible to Virginia
                residents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
