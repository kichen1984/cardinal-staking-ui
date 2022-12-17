import { FlagIcon } from 'assets/icons/FlagIcon'
import { GasPumpIcon } from 'assets/icons/GasPumpIcon'
import { SettingsIcon } from 'assets/icons/SettingsIcon'
import { AsyncButton } from 'common/Button'
import { FooterSlim } from 'common/FooterSlim'
import { HeaderSlim } from 'common/HeaderSlim'
import { withCluster } from 'common/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useState } from 'react'
import { VscChevronLeft } from 'react-icons/vsc'

import { StepIndicator } from '../stake-pool-creation/master-panel/step-indicator/StepIndicator'
import { AdminStakePool } from './AdminPool'
import { AdminPools } from './AdminPools'

type PANE_OPTIONS = 'create' | 'edit'

function Admin() {
  const { environment } = useEnvironmentCtx()
  const [pane, setPane] = useState<PANE_OPTIONS>('edit')
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Cardinal Staking UI</title>
        <meta name="description" content="Generated by Cardinal Staking UI" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="stake.cardinal.so"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>

      <HeaderSlim />
      <div className="container mx-auto w-full flex-grow">
        <div className="mt-8 flex items-center justify-between">
          <div className="text-2xl font-medium">
            {
              {
                create: (
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2"
                    onClick={() => setPane('edit')}
                  >
                    <VscChevronLeft />
                    Manage
                  </div>
                ),
                edit: 'Your Stake Pool',
              }[pane]
            }
          </div>
          {
            {
              create: '',
              edit: (
                <AsyncButton
                  className="px-6 py-2"
                  onClick={() => setPane('create')}
                >
                  Create +
                </AsyncButton>
              ),
            }[pane]
          }
        </div>
        {
          {
            create: (
              <div className="mx-auto w-full">
                <div className="mx-auto mb-4 flex w-full w-full max-w-[640px] flex-col items-center justify-center gap-6">
                  <div className="text-4xl text-light-0">Create new pool</div>
                  <StepIndicator currentStep={0} />
                  <div className="text-gray-400">
                    Adding utility like staking brings rewards for both the
                    users and the NFT collection itself.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex w-full rounded-xl bg-gray-800 p-6">
                      <div className="mr-4">
                        <FlagIcon />
                      </div>
                      Setup your stake pool - all parameters are editable
                      afterwards
                    </div>
                    <div className="flex w-full rounded-xl bg-gray-800 p-6">
                      <div className="mr-4">
                        <GasPumpIcon />
                      </div>
                      You will only be charged with blockchain gas fees
                    </div>
                    <div className="flex w-full rounded-xl bg-gray-800 p-6">
                      <div className="mr-4">
                        <SettingsIcon />
                      </div>
                      Add features and reward distribution mechanisms
                    </div>
                  </div>
                </div>
                <AdminStakePool
                  onSuccess={(stakePoolId) =>
                    router.push(
                      withCluster(
                        `/admin/${stakePoolId?.toString()}`,
                        environment.label
                      )
                    )
                  }
                />
              </div>
            ),
            edit: <AdminPools />,
          }[pane]
        }
      </div>
      <FooterSlim />
    </div>
  )
}

export default Admin