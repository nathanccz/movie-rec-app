import { Icon } from "@iconify/react/dist/iconify.js"

export default function SaveButton({ handleSave, loading }) {
    return (
        <button className="btn btn-success lg:w-36" onClick={handleSave}> 
            {loading && <> <span class="loading loading-spinner loading-md"></span> Saving </>}
            {!loading && <> <Icon icon="material-symbols:save-outline" className='text-xl'/> Save </>}
        </button>
    )
}