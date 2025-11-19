import { Controller } from '@nestjs/common';
import { Implement } from '@orpc/nest';
import { implement } from '@orpc/server';
import { contract } from '@speechscribe/contracts';
import { CheckFeatureFlagUseCase } from './application/check-feature-flag.use-case';
import type { FeatureFlagKey } from '@speechscribe/contracts';

@Controller()
export class FeatureFlagController {
  constructor(private readonly checkFlag: CheckFeatureFlagUseCase) {}

  @Implement(contract.featureFlags.get)
  getFlag() {
    return implement(contract.featureFlags.get).handler(
      async ({
        input,
      }): Promise<{ flag: FeatureFlagKey; enabled: boolean }> => {
        const flag = input.params.flag;
        const enabled = await this.checkFlag.execute(flag);

        return { flag, enabled };
      },
    );
  }
}
