import React, {
	PureComponent,
	RefObject,
	createRef,
	MouseEvent,
	ChangeEvent,
} from 'react';
import './AutoComplete.scss';
import { IAutoCompleteProps, IAutoCompleteStates } from './interface';
import debounce from 'lodash/debounce';
import addPlusDark from '../../../assets/img/add-plus-ico-dark.svg';
import addPlusBlue from '../../../assets/img/add-plus-ico-blue.svg';
import checkMarkBlue from '../../../assets/img/checkmark-blue.svg';
import removeIco from '../../../assets/img/remove-icon.svg';
import { asyncSetState } from '../../../settings/helpers/Common';
import Avatar from 'react-avatar';

class AutoComplete extends PureComponent<
	IAutoCompleteProps,
	IAutoCompleteStates
> {
	state: IAutoCompleteStates = {
		searchString: '',
		showAutoComplete: false,
	};

	private autocompleteRef:
		| string
		| ((instance: HTMLDivElement | null) => void)
		| RefObject<HTMLDivElement>
		| null
		| undefined = createRef<HTMLDivElement>();

	componentDidMount = () => {
		document.addEventListener('mousedown', this.handleClickOutside);
		this.onChangeDebounced = debounce(this.onChangeDebounced, 400);
	};

	componentWillUnmount = () => {
		document.removeEventListener('mousedown', this.handleClickOutside);
	};

	handleInputs = async (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();

		const { currentTarget } = event;
		const { value } = currentTarget;
		await asyncSetState(this)({ ...this.state, searchString: value });
		await this.onChangeDebounced();
	};

	handleInputClicks = async (event: MouseEvent) => {
		event.preventDefault();
		await asyncSetState(this)({ showAutoComplete: true });
	};

	handleClickOutside = async (e: any) => {
		const autocompleteEle: any = this.autocompleteRef;
		if (autocompleteEle.current.contains(e.target)) {
			return; // inside click
		}
		await asyncSetState(this)({ showAutoComplete: false }); // outside click
		return;
	};

	onChangeDebounced = async () => {
		const { searchString } = this.state;
		await this.props.onSearch(searchString); // Delayed function, call api to get searched values values
	};

	render() {
		const {
			inputLabel,
			inputRequired,
			inputPlaceholder,
			showAddNewItem,
			addNewItemText,
			addNewItem,
			searchedItems,
			selectedItems,
			onSelectItem,
			onRemoveItem,
		} = this.props;
		const { showAutoComplete, searchString } = this.state;

		return (
			<div className='branch-service-block'>
				{/* <Button
					variant="link"
					type="button"
					className="btn-circle btn-with-icon"
					onClick={onSaveSelect}>
					<img src={addPlusBlue} alt="" width="25" />
				</Button> */}
				<div className='auto-suggestion-wrap' ref={this.autocompleteRef}>
					<div className='form-group'>
						<label htmlFor='serviceSearch'>
							{inputLabel}{' '}
							{inputRequired ? (
								<span className='required-field'> *</span>
							) : (
								undefined
							)}
						</label>
						<input
							id='serviceSearch'
							type='text'
							placeholder={inputPlaceholder}
							aria-describedby={inputLabel}
							name='searchString'
							value={searchString}
							onChange={this.handleInputs}
							onClickCapture={this.handleInputClicks}
							className='form-control'
							autoComplete={'off'}
							autoCapitalize={'off'}
							autoCorrect={'off'}
						/>
					</div>
					{showAutoComplete ? (
						<div className={'show-autocomplete'}>
							<ul className='custom-scrollbar'>
								{showAddNewItem ? (
									<li onClick={addNewItem}>
										<span className='suggest-name'>{addNewItemText}</span>
										<span className='addnew-img-wrap'>
											<img
												className='active-img'
												src={addPlusDark}
												alt=''
												width='30'
											/>
											<img
												className='hover-img'
												src={addPlusBlue}
												alt=''
												width='30'
											/>
										</span>
									</li>
								) : (
									undefined
								)}
								{searchedItems.map((k: any) => (
									<li
										key={k._id}
										onClick={(e: MouseEvent) => onSelectItem(e, k)}
									>
										{/* <span className='suggest-name'>{k.name}</span> */}
										<div className='hb-user-card'>
											<div className='hb-user-card-pic'>
												{k.coverThumbUrl || k.profileThumbUrl ? (
													<img
														alt=''
														src={k.coverThumbUrl || k.profileThumbUrl}
													/>
												) : (
													<Avatar
														name={k.name}
														maxInitials={1}
														size='40'
														round={true}
													/>
												)}
											</div>
											<div className='hb-user-card-details'>
												<span className='hb-user-card-name first-caps'>
													{k.name}
												</span>
												{k.shift ? (
													<span className='hb-user-card-desc first-caps'>
														<i className='fas fa-clock mr-1'></i>
														{k.shift}
													</span>
												) : null}
											</div>
										</div>
										{selectedItems.findIndex(d => d._id === k._id) > -1 ? (
											<span className='checkmark-img'>
												<img src={checkMarkBlue} alt='' width='30' />
											</span>
										) : (
											undefined
										)}
									</li>
								))}
							</ul>
						</div>
					) : (
						undefined
					)}
				</div>
				<div className='auto-selected-list-block'>
					{selectedItems.length ? (
						<ol className='custom-scrollbar'>
							{selectedItems.map(k => (
								<li key={k._id}>
									{/* <span className='name'>{k.name}</span> */}
									<div className='hb-user-card'>
										<div className='hb-user-card-pic'>
											{k.coverThumbUrl || k.profileThumbUrl ? (
												<img
													alt=''
													src={k.coverThumbUrl || k.profileThumbUrl}
												/>
											) : (
												<Avatar
													name={k.name}
													maxInitials={1}
													size='40'
													round={true}
												/>
											)}
										</div>
										<div className='hb-user-card-details'>
											<span className='hb-user-card-name first-caps'>
												{k.name}
											</span>
											{k.shift ? (
												<span className='hb-user-card-desc first-caps'>
													<i className='fas fa-clock mr-1'></i>
													{k.shift}
												</span>
											) : null}
										</div>
									</div>
									<span
										className='remove-ico'
										onClick={(e: MouseEvent) => onRemoveItem(e, k._id)}
									>
										<img src={removeIco} alt='' width='20' />
									</span>
								</li>
							))}
						</ol>
					) : (
						undefined
					)}
				</div>
			</div>
		);
	}
}

export default AutoComplete;
