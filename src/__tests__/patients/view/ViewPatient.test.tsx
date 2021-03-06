import '../../../__mocks__/matchMediaMock'
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'
import Patient from '../../../model/Patient'
import PatientRepository from '../../../clients/db/PatientRepository'
import * as titleUtil from '../../../page-header/useTitle'
import ViewPatient from '../../../patients/view/ViewPatient'
import store from '../../../store'

describe('ViewPatient', () => {
  const patient = {
    id: '123',
    prefix: 'prefix',
    givenName: 'givenName',
    familyName: 'familyName',
    suffix: 'suffix',
    sex: 'male',
    type: 'charity',
    occupation: 'occupation',
    preferredLanguage: 'preferredLanguage',
    phoneNumber: 'phoneNumber',
    email: 'email@email.com',
    address: 'address',
    friendlyId: 'P00001',
    dateOfBirth: new Date().toISOString(),
  } as Patient

  const setup = () => {
    jest.spyOn(PatientRepository, 'find')
    const mockedPatientRepository = mocked(PatientRepository, true)
    mockedPatientRepository.find.mockResolvedValue(patient)
    jest.mock('react-router-dom', () => ({
      useParams: () => ({
        id: '123',
      }),
    }))

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/patients/123']}>
          <Route path="/patients/:id">
            <ViewPatient />
          </Route>
        </MemoryRouter>
      </Provider>,
    )

    wrapper.update()
    return wrapper
  }

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should render a header with the patients given, family, and suffix', async () => {
    jest.spyOn(titleUtil, 'default')
    await act(async () => {
      await setup()
    })
    expect(titleUtil.default).toHaveBeenCalledWith(
      `${patient.givenName} ${patient.familyName} ${patient.suffix} (${patient.friendlyId})`,
    )
  })

  it('should render the sex select', () => {
    const wrapper = setup()

    const sexSelect = wrapper.findWhere((w) => w.prop('name') === 'sex')
    expect(sexSelect.prop('value')).toEqual(patient.sex)
    expect(sexSelect.prop('label')).toEqual('patient.sex')
    expect(sexSelect.prop('isEditable')).toBeFalsy()
  })

  it('should render the patient type select', () => {
    const wrapper = setup()

    const typeSelect = wrapper.findWhere((w) => w.prop('name') === 'type')
    expect(typeSelect.prop('value')).toEqual(patient.type)
    expect(typeSelect.prop('label')).toEqual('patient.type')
    expect(typeSelect.prop('isEditable')).toBeFalsy()
  })

  it('should render the age of the patient', () => {
    const wrapper = setup()

    const ageInput = wrapper.findWhere((w) => w.prop('name') === 'age')
    expect(ageInput.prop('value')).toEqual('0')
    expect(ageInput.prop('label')).toEqual('patient.age')
    expect(ageInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the date of the birth of the patient', () => {
    const wrapper = setup()

    const dateOfBirthInput = wrapper.findWhere((w) => w.prop('name') === 'dateOfBirth')
    expect(dateOfBirthInput.prop('value')).toEqual(new Date(patient.dateOfBirth))
    expect(dateOfBirthInput.prop('label')).toEqual('patient.dateOfBirth')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the occupation of the patient', () => {
    const wrapper = setup()

    const dateOfBirthInput = wrapper.findWhere((w) => w.prop('name') === 'occupation')
    expect(dateOfBirthInput.prop('value')).toEqual(patient.occupation)
    expect(dateOfBirthInput.prop('label')).toEqual('patient.occupation')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the preferred language of the patient', () => {
    const wrapper = setup()

    const dateOfBirthInput = wrapper.findWhere((w) => w.prop('name') === 'preferredLanguage')
    expect(dateOfBirthInput.prop('value')).toEqual(patient.preferredLanguage)
    expect(dateOfBirthInput.prop('label')).toEqual('patient.preferredLanguage')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the phone number of the patient', () => {
    const wrapper = setup()

    const dateOfBirthInput = wrapper.findWhere((w) => w.prop('name') === 'phoneNumber')
    expect(dateOfBirthInput.prop('value')).toEqual(patient.phoneNumber)
    expect(dateOfBirthInput.prop('label')).toEqual('patient.phoneNumber')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the email of the patient', () => {
    const wrapper = setup()

    const dateOfBirthInput = wrapper.findWhere((w) => w.prop('name') === 'email')
    expect(dateOfBirthInput.prop('value')).toEqual(patient.email)
    expect(dateOfBirthInput.prop('label')).toEqual('patient.email')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the address of the patient', () => {
    const wrapper = setup()

    const dateOfBirthInput = wrapper.findWhere((w) => w.prop('name') === 'address')
    expect(dateOfBirthInput.prop('value')).toEqual(patient.address)
    expect(dateOfBirthInput.prop('label')).toEqual('patient.address')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })

  it('should render the age and date of birth as approximate if patient.isApproximateDateOfBirth is true', async () => {
    jest.restoreAllMocks()
    const patientWithApproximateDob = {
      ...patient,
      isApproximateDateOfBirth: true,
    } as Patient
    jest.spyOn(PatientRepository, 'find')
    const mockedPatientRepository = mocked(PatientRepository, true)
    mockedPatientRepository.find.mockResolvedValue(patientWithApproximateDob)
    jest.mock('react-router-dom', () => ({
      useParams: () => ({
        id: '123',
      }),
    }))

    let wrapper: any
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/patients/123']}>
            <Route path="/patients/:id">
              <ViewPatient />
            </Route>
          </MemoryRouter>
        </Provider>,
      )
    })

    wrapper.update()

    const ageInput = wrapper.findWhere((w: any) => w.prop('name') === 'age')
    expect(ageInput.prop('value')).toEqual('0')
    expect(ageInput.prop('label')).toEqual('patient.approximateAge')
    expect(ageInput.prop('isEditable')).toBeFalsy()

    const dateOfBirthInput = wrapper.findWhere((w: any) => w.prop('name') === 'dateOfBirth')
    expect(dateOfBirthInput.prop('value')).toEqual(new Date(patient.dateOfBirth))
    expect(dateOfBirthInput.prop('label')).toEqual('patient.approximateDateOfBirth')
    expect(dateOfBirthInput.prop('isEditable')).toBeFalsy()
  })
})
